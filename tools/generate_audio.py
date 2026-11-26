#!/usr/bin/env python3
"""Genera con Piper los audios de Tux para un idioma (por defecto es -> voz es_AR-daniela-high).

Qué hace:
  1. Lee lang/<idioma>.js y expande todas las frases posibles (variantes x letras x números).
  2. Las corta en trozos por la puntuación (igual que common.js) y genera un clip por trozo.
  3. Guarda los clips en audio/<idioma>/phrases/ y audio/<idioma>/sounds/ y escribe audio/<idioma>/manifest.js.

Los clips que YA existen no se pisan (así se conservan tus grabaciones). Para regenerar todo: --force.
Uso:  .venv/bin/python tools/generate_audio.py [--lang es] [--force] [--prune] [--voice es_AR-daniela-high]
"""
import argparse, hashlib, json, re, shutil, subprocess, sys, tempfile, unicodedata, wave
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VOICES = {"es": "es_AR-daniela-high"}   # voz de Piper por idioma
PHRASE_STRETCH = 1.25    # velocidad de las frases: >1 más lento (pensado para chicos de 5 años)
SOUND_STRETCH = 3.5      # estiramiento de los sonidos sostenidos (aaa, mmm, sss...)
SPLIT = re.compile(r"[.,;:!?¡¿…]+")      # tiene que ser IGUAL a chunksOf() de common.js
EXTS = (".mp3", ".m4a", ".ogg", ".wav")  # formatos que se reconocen si reemplazás un clip a mano
ONLY = {"letterIntro": "letters", "numberIntro": "numbers", "numberTotal": "numbers"}  # frases que solo aplican a uno


def load_lang(lang):
    s = (ROOT / "lang" / f"{lang}.js").read_text(encoding="utf-8")
    return json.loads(s[s.index("{"): s.rindex("}") + 1])   # el archivo es JSON dentro de window.LANG = ...;


def all_texts(L):
    k = L["kinds"]
    letters = [dict(sound=v["sound"], name=v["name"], word=v["word"], kind=k["letter"]) for v in L["letters"].values()]
    numbers = [dict(name=n, kind=k["number"]) for n in L["numbers"]]
    out = set(L["numbers"])   # al contar, Tux dice cada número solo
    for key, templates in L["say"].items():
        for tpl in templates:
            vs = [{}]
            if "{{name}}" in tpl:
                vs = {"letters": letters, "numbers": numbers}.get(ONLY.get(key), letters + numbers)
            for v in vs:
                out.add(re.sub(r"\{\{(\w+)\}\}", lambda m: v.get(m.group(1), ""), tpl))
    return out


def slug(text):
    s = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")[:60] or "x"


def encoder():
    if shutil.which("ffmpeg"):
        return ".mp3", lambda a, b: ["ffmpeg", "-y", "-loglevel", "error", "-i", a, "-ac", "1", "-b:a", "40k", b]
    if shutil.which("afconvert"):
        return ".m4a", lambda a, b: ["afconvert", "-f", "m4af", "-d", "aac", "-b", "40000", a, b]
    sys.exit("Necesito ffmpeg (o afconvert en macOS) para comprimir los audios.")


def find(base):
    return next((base.with_suffix(e) for e in EXTS if base.with_suffix(e).exists()), None)


_short = None


def load_voice(name):
    import piper
    from piper import PiperVoice
    d = ROOT / "tools" / "voices"
    onnx = d / f"{name}.onnx"
    if not onnx.exists():
        subprocess.run([sys.executable, "-m", "piper.download_voices", name, "--data-dir", str(d)], check=True)
    # eSpeak falla si la ruta de sus datos es larga (>~160 caracteres, típico de un .venv profundo):
    # se la damos por un symlink corto en una carpeta temporal.
    global _short
    _short = tempfile.TemporaryDirectory(prefix="p")
    link = Path(_short.name) / "d"
    link.symlink_to(Path(piper.__file__).parent / "espeak-ng-data")
    return PiperVoice.load(str(onnx), espeak_data_dir=str(link))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--lang", default="es")
    ap.add_argument("--voice")
    ap.add_argument("--force", action="store_true", help="regenerar también los clips que ya existen")
    ap.add_argument("--prune", action="store_true", help="borrar clips que ya ninguna frase usa (ojo: también borra grabaciones propias huérfanas)")
    a = ap.parse_args()

    L = load_lang(a.lang)
    out = ROOT / "audio" / a.lang
    chunks = sorted({c.strip() for t in all_texts(L) for c in SPLIT.split(t) if c.strip()})
    phon = {v["sound"]: v["phonemes"] for v in L["letters"].values() if "phonemes" in v}
    sounds = {v["sound"] for v in L["letters"].values()}

    counts = Counter(slug(c) for c in chunks)   # si dos trozos dan el mismo nombre, ambos llevan un hash
    plan = {}
    for c in chunks:
        stem = slug(c) if counts[slug(c)] == 1 else f"{slug(c)}-{hashlib.sha1(c.encode()).hexdigest()[:6]}"
        plan[c] = out / ("sounds" if c in sounds else "phrases") / stem

    ext, cmd = encoder()
    todo = [c for c, base in plan.items() if a.force or not find(base)]
    print(f"{len(chunks)} trozos, {len(todo)} por generar ({len(chunks) - len(todo)} ya existen)")
    if todo:
        from piper import SynthesisConfig
        voice = load_voice(a.voice or VOICES[a.lang])
        tmp = out / "_tmp.wav"
        for i, c in enumerate(todo, 1):
            base = plan[c]
            base.parent.mkdir(parents=True, exist_ok=True)
            text, stretch = (f"[[ {phon[c]} ]]", SOUND_STRETCH) if c in phon else (c, PHRASE_STRETCH)
            with wave.open(str(tmp), "wb") as w:
                voice.synthesize_wav(text, w, syn_config=SynthesisConfig(length_scale=stretch))
            for e in EXTS:   # al regenerar, sacar versiones viejas en otro formato
                base.with_suffix(e).unlink(missing_ok=True)
            subprocess.run(cmd(str(tmp), str(base.with_suffix(ext))), check=True)
            if i % 50 == 0 or i == len(todo):
                print(f"  {i}/{len(todo)}", flush=True)
        tmp.unlink(missing_ok=True)

    manifest = {c: find(b).relative_to(out).as_posix() for c, b in plan.items() if find(b)}
    (out / "manifest.js").write_text(
        "/* Generado por tools/generate_audio.py: texto -> archivo de audio. No hace falta editarlo a mano. */\n"
        "window.AUDIO = " + json.dumps(manifest, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
    print(f"manifest.js con {len(manifest)} audios en {out}")
    if a.prune:
        used = {out / f for f in manifest.values()}
        orphans = [f for d in ("sounds", "phrases") for f in (out / d).glob("*") if f not in used]
        for f in orphans:
            f.unlink()
        print(f"{len(orphans)} clips huérfanos borrados")


if __name__ == "__main__":
    main()
