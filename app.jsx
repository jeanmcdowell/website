// App shell - wires sections together, owns Tweaks state.
const PALETTES = {
  bauhaus: { "--bg": "#f2ece1", "--paper": "#fbf7ee", "--ink": "#0a0a0a", "--red": "#d8331f", "--yellow": "#f5c518", "--blue": "#1f3fa3" },
  noir: { "--bg": "#111111", "--paper": "#f4eee2", "--ink": "#f4eee2", "--red": "#ff3b1f", "--yellow": "#ffd400", "--blue": "#3661ff" },
  dessau: { "--bg": "#ece6d4", "--paper": "#faf3df", "--ink": "#1a1a1a", "--red": "#c0271b", "--yellow": "#e8a83a", "--blue": "#0e3b75" },
  swiss: { "--bg": "#ffffff", "--paper": "#f5f5f5", "--ink": "#0a0a0a", "--red": "#e30613", "--yellow": "#0a0a0a", "--blue": "#0a0a0a" },
  albers: { "--bg": "#efe6cf", "--paper": "#f6efd9", "--ink": "#2a1a0e", "--red": "#c93a1a", "--yellow": "#e9b32f", "--blue": "#5b3b1c" },
};
const TYPE_PAIRS = {
  archivo: { "--display": "'Archivo Black', 'Helvetica Neue', sans-serif", "--body": "'Inter', sans-serif" },
  druk: { "--display": "'Anton', 'Druk', 'Helvetica Neue', sans-serif", "--body": "'Inter', sans-serif" },
  futura: { "--display": "'Bowlby One', 'Futura', sans-serif", "--body": "'Work Sans', sans-serif" },
  mono: { "--display": "'Space Mono', monospace", "--body": "'Space Mono', monospace" },
  slab: { "--display": "'Alfa Slab One', serif", "--body": "'IBM Plex Sans', sans-serif" },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "bauhaus",
  "typePair": "archivo",
  "showGrid": true
}/*EDITMODE-END*/;

const App = () => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply palette + type pair as CSS vars
  React.useEffect(() => {
    const pal = PALETTES[t.palette] || PALETTES.bauhaus;
    const typ = TYPE_PAIRS[t.typePair] || TYPE_PAIRS.archivo;
    Object.entries(pal).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
    Object.entries(typ).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
    document.documentElement.style.setProperty("--grid-line",
      t.showGrid ? (t.palette === "noir" ? "rgba(244,238,226,0.05)" : "rgba(10,10,10,0.06)") : "transparent");
  }, [t.palette, t.typePair, t.showGrid]);

  return (
    <div>
      <Hero/>
      <About/>
      <Resume/>
      <Capabilities/>
      <Contact/>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette"/>
        <TweakRadio
          label="Theme"
          value={t.palette}
          options={["bauhaus", "noir", "dessau", "swiss", "albers"]}
          onChange={(v) => setTweak("palette", v)}
        />
        <TweakSection label="Typography"/>
        <TweakSelect
          label="Display + body"
          value={t.typePair}
          options={[
            { value: "archivo", label: "Archivo Black / Inter" },
            { value: "druk", label: "Anton / Inter" },
            { value: "futura", label: "Bowlby / Work Sans" },
            { value: "mono", label: "Space Mono everything" },
            { value: "slab", label: "Alfa Slab / Plex Sans" },
          ]}
          onChange={(v) => setTweak("typePair", v)}
        />
        <TweakSection label="Composition"/>
        <TweakToggle label="Show construction grid" value={t.showGrid} onChange={(v) => setTweak("showGrid", v)}/>
      </TweaksPanel>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
