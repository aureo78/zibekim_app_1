import {
  AlertTriangle,
  ClipboardList,
  Home,
  Lightbulb,
  Mail,
  MessageCircle,
  Megaphone,
  Newspaper,
} from "lucide-react";
import "./App.css";

const navigationItems = [
  { label: "Home", icon: Home },
  { label: "Messages", icon: MessageCircle },
  { label: "News", icon: Newspaper },
  { label: "Reports", icon: ClipboardList },
  { label: "Ideas", icon: Lightbulb },
  { label: "Problems", icon: AlertTriangle },
  { label: "Forums", icon: Mail },
  { label: "Surveys", icon: Megaphone },
];

function App() {
  return (
    <div className="app">
      <aside className="sidebar" aria-label="Navigation">
        {navigationItems.map(({ label, icon: Icon }) => (
          <button className="navigation-button" type="button" aria-label={label} key={label}>
            <Icon aria-hidden="true" />
          </button>
        ))}
      </aside>
    </div>
  );
}

export default App;
