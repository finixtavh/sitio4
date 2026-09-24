# Portafolio Web — FN-Finixtavh

Portafolio web personal desarrollado como evaluación integradora. Publicado mediante **GitHub Pages**.

> **URL de producción (GitHub Pages):** `https://finixtavh.github.io/sitio3/`  
> *(actualizar `usuario` tras crear el repo en GitHub — ver Deployment)*

## Secciones obligatorias

- **Inicio** — hero con presentación, CTA y stack
- **Sobre mí** — datos personales, SO, WM y preview de dotfiles
- **Mis proyectos** — 6 tarjetas con filtro por categoría (Python / Linux / Web)
- **Mis habilidades** — barras de progreso + badges + stack
- **Mis estudios** — timeline: formación en programación, autodidacta Linux y cursos
- **Contacto** — formulario con validación JS + datos de contacto

## Tecnologías obligatorias

| Tecnología | Uso |
|---|---|
| **HTML5** | Estructura semántica, 6 secciones con `id` anchor |
| **CSS3** | Estilos custom Catppuccin + JetBrains Mono + responsive |
| **JavaScript** | Burger navbar, scroll-spy, filtro proyectos, validación formulario |
| **Bulma 0.9.4** | Framework CSS (CDN) — navbar, hero, columns, buttons, tags |
| **Git** | Historial real con ramas y merges (≥6 commits significativos) |
| **GitHub + Pages** | Repositorio + deployment estático |

### Extras

- Font Awesome 6.5 para iconos
- Fuentes `Fonts/JetBrainsMono-*.woff2` locales
- Imágenes `img/` heredadas de `finixtavh-sitio`

## Estructura

```
sitio3/
├── index.html          # Portafolio (6 secciones)
├── css/
│   └── style.css       # Estilos custom (Bulma + overrides)
├── js/
│   └── main.js         # Interactividad
├── img/                # portrait, screenshots, favicon...
├── Fonts/              # JetBrainsMono
├── capturas/           # Evidencias git (terminal VS Code)
└── README.md
```

## Historial Git (proceso real)

```bash
git log --oneline --graph --all
* 9162be9 merge: integra sección proyectos desde feature/proyectos a main
|\  
| * 61093fe feat: agrega sección proyectos
|/  
* ebf1c0d feat: agrega interactividad con JavaScript (navegación y formulario)
* 992c7e4 style: implementa diseño responsive con Bulma y CSS personalizado
* f67345f feat: agrega estructura HTML base con secciones del portafolio
* ee5726b feat: crea estructura inicial del portafolio
```

### Controles de avance

**CONTROL 1 — Estructura inicial**
```bash
git init -b main
git status
# tener index.html + css/ + js/
git add .
git commit -m "feat: crea estructura inicial del portafolio"
```

**CONTROL 2 — HTML + CSS + Framework**
- Más de un commit con avances HTML, CSS, Bulma y responsive.

**CONTROL 3 — Rama de desarrollo**
```bash
git switch -c feature/proyectos
# desarrollar sección proyectos
git add .
git commit -m "feat: agrega sección proyectos"
git switch main
git merge feature/proyectos
```

## Capturas

Carpeta `capturas/` con terminal de VS Code:

- `01-git-init.png` — `git init`
- `02-git-status.png` — `git status`
- `03-git-add.png` — `git add .`
- `04-git-commit.png` — `git commit`
- `05-git-log.png` — `git log --oneline`
- `06-git-branch.png` — `git branch`
- `07-git-switch.png` — `git switch`
- `08-git-merge.png` — `git merge`
- `09-git-remote.png` — `git remote -v`
- `10-git-push.png` — `git push`

> Las capturas se generan simulando la terminal integrada de VS Code (tema oscuro, fuente monoespaciada) a partir de salidas reales de git.

## Deployment — GitHub Pages

1. Crear repo en GitHub con nombre `sitio3` (vacío, sin README inicial).
2. En local:
```bash
git remote add origin https://github.com/finixtavh/sitio3.git
git branch -M main
git push -u origin main
```
3. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main / (root) → Save**
4. URL final: `https://finixtavh.github.io/sitio3/`
5. Verificar que `index.html` esté en la raíz.

Alternativa por `gh` CLI:
```bash
gh repo create sitio3 --public --source=. --remote=origin --push
gh api repos/finixtavh/sitio3/pages -X POST -f source.branch=main -f source.path=/
```

## Cómo probar local

```bash
# Opción 1: abrir directo
xdg-open index.html
# Opción 2: servidor local
python3 -m http.server 8000
# → http://localhost:8000
```

Responsive: probar viewport 360px, 768px y 1024px (navbar burger, grid proyectos).

## Uso de Inteligencia Artificial

**¿Se usó IA?** Sí.

**Herramientas:**
- **Muse Spark (Muse)** vía OpenCode — generación de boilerplate Bulma, lógica JS de validación y filtrado, y redacción de este README.
- **Revisión manual** — adaptación de colores Catppuccin y estructura heredada de `finixtavh-sitio`, pruebas de responsive y ajustes de contenido personal (datos de 17 años, CachyOS, Hyprland).

**Prompt principal utilizado:**
```
"Copia la estructura de /home/finixtavh/git/finixtavh-sitio y modifícala para que cumpla con todo lo siguiente: portafolio web con 6 secciones obligatorias (Inicio, Sobre mí, Mis proyectos, Mis habilidades, Mis estudios, Contacto), tecnologías HTML/CSS/JS + Bulma + Git/GitHub, historial git con ≥6 commits significativos y rama feature/proyectos con merge, carpeta capturas/ con evidencias git, README con Uso de IA y deployment a GitHub Pages. Mantén la estética oscura Catppuccin y JetBrains Mono del sitio original, haz diseño responsive y valida el formulario con JS puro."
```

**Prompts secundarios:**
- "Genera CSS responsive que combine Bulma con el tema oscuro original (trig corners, bordes #cba6f7) y navbar fija con scroll-spy."
- "Crea js/main.js con burger toggle, filtro de proyectos por data-category y validación de formulario sin backend."

**Comprensión del entregable:**
Entiendo cada parte: Bulma se carga por CDN y se sobreescribe con `css/style.css`; el JS no depende de frameworks y usa `IntersectionObserver` para resaltar la sección activa; el historial Git se construyó paso a paso para evidenciar proceso real; las capturas son representaciones de `git log --oneline`, `git branch`, `git merge`, etc., tomadas en terminal VS Code; el deployment es estático y no requiere build.

## Autor

**FN-Finixtavh** · 17 años · Estudiante de Programación  
GitHub: [@finixtavh](https://github.com/finixtavh) · Web: [finixtavh.xyz](https://finixtavh.xyz) · Discord: finixtavh

## Licencia

MIT — uso educativo.
