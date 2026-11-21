import {
  AlertTriangle,
  ClipboardList,
  Home,
  Lightbulb,
  Mail,
  MessageCircle,
  Megaphone,
  Newspaper,
  Settings,
} from "lucide-react";
import "./App.css";

const navigationItems = [
  { label: "Pagrindinis", icon: Home },
  { label: "Žinutės", icon: MessageCircle },
  { label: "Naujienos", icon: Newspaper },
  { label: "Apklausos", icon: ClipboardList },
  { label: "Idėjos", icon: Lightbulb },
  { label: "Problemos", icon: AlertTriangle },
  { label: "Forumai", icon: Mail },
  { label: "Skelbimai", icon: Megaphone },
];

function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 323 321" role="img" aria-label="Žibėkim logo">
      <path
        d="M101 124 C130 115 158 94 174 62 C180 50 183 37 184 29 C184 52 186 73 195 88 C200 96 205 99 209 101 C192 96 176 99 158 105 C137 112 118 120 101 124 Z"
      />
      <path
        d="M26 122 C43 134 62 136 82 135 C124 134 174 121 220 113 C257 107 291 105 321 105 C288 125 252 145 216 164 C181 183 150 204 128 228 C165 208 204 187 239 170 L280 274 C263 258 247 248 226 243 C190 236 157 240 126 248 C93 257 64 271 36 287 C44 263 53 242 69 225 C88 205 112 190 140 174 C164 160 187 149 207 141 C166 160 124 178 83 191 C56 169 34 141 26 122 Z"
      />
    </svg>
  );
}

function App() {
  return (
    <div className="app">
      <aside className="sidebar" aria-label="Navigacija">
        <div className="brand-header">
          <LogoMark />
          <div className="brand-copy">
            <div className="brand-name">Žibėkim</div>
            <div className="brand-school">
              Vytauto Didžiojo universiteto Šakių „Žiburio“ gimnazija
            </div>
          </div>
        </div>

        {navigationItems.map(({ label, icon: Icon }) => (
          <button className="navigation-button" type="button" aria-label={label} key={label}>
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}

        <button className="navigation-button settings-button" type="button" aria-label="Nustatymai">
          <Settings aria-hidden="true" />
          <span>Nustatymai</span>
        </button>

        <div className="sidebar-version">v.RETRO.2026.11.21.01</div>
      </aside>
    </div>
  );
}

export default App;
