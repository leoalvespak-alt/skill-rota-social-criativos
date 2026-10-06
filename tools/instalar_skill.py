"""Instala/sincroniza a skill rota-social-criativos no Claude Code, Codex e OpenCode.

Fonte única: rota-ataque-criativos/skills/rota-social-criativos (esta pasta do plugin).
Uso:
  python rota-ataque-criativos/tools/instalar_skill.py            # copia para os 3 destinos (faz backup antes)
  python rota-ataque-criativos/tools/instalar_skill.py --verificar # só compara hashes
"""
import hashlib
import shutil
import sys
from datetime import datetime
from pathlib import Path

NOME = "rota-social-criativos"
FONTE = Path(__file__).resolve().parents[1] / "skills" / NOME
HOME = Path.home()
DESTINOS = {
    "codex": HOME / ".codex" / "skills" / NOME,
    "claude-code": HOME / ".claude" / "skills" / NOME,
    "opencode": HOME / ".config" / "opencode" / "skills" / NOME,
}
BACKUP = Path(__file__).resolve().parents[2] / "backups"
IGNORAR = {"__pycache__", ".DS_Store"}


def arquivos(raiz: Path) -> dict:
    out = {}
    for f in sorted(raiz.rglob("*")):
        if f.is_file() and not any(p in IGNORAR for p in f.parts):
            out[f.relative_to(raiz).as_posix()] = hashlib.sha256(f.read_bytes()).hexdigest()
    return out


def verificar() -> bool:
    base = arquivos(FONTE)
    ok = True
    for nome, dest in DESTINOS.items():
        if not dest.exists():
            print(f"[{nome}] ausente: {dest}"); ok = False; continue
        atual = arquivos(dest)
        dif = sorted(set(base) ^ set(atual)) + sorted(k for k in base if k in atual and base[k] != atual[k])
        print(f"[{nome}] {'idêntica' if not dif else f'{len(dif)} diferença(s)'}: {dest}")
        for d in dif[:10]:
            print("    ", d)
        ok = ok and not dif
    return ok


def instalar() -> None:
    carimbo = datetime.now().strftime("%Y%m%d-%H%M%S")
    for nome, dest in DESTINOS.items():
        if dest.exists():
            bk = BACKUP / f"skill-{NOME}-{nome}-{carimbo}"
            shutil.copytree(dest, bk)
            shutil.rmtree(dest)
            print(f"[{nome}] backup: {bk}")
        shutil.copytree(FONTE, dest, ignore=shutil.ignore_patterns(*IGNORAR))
        print(f"[{nome}] instalada: {dest}")


if __name__ == "__main__":
    if "--verificar" not in sys.argv:
        instalar()
    sys.exit(0 if verificar() else 1)
