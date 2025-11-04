import React, { useState } from "react";
import VConsole from "vconsole";

const DebugToggle = () => {
  const [vConsole, setVConsole] = useState(null);

  const handleToggle = () => {
    if (vConsole) {
      vConsole.destroy();
      setVConsole(null);
      alert("🔒 Debug console closed");
    } else {
      const vc = new VConsole();
      setVConsole(vc);
      alert("🪄 Debug console opened");
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-4 right-4 z-[9999] bg-primary text-white px-4 py-2 rounded-full shadow-lg text-sm"
    >
      🧩 Debug
    </button>
  );
};

export default DebugToggle;
