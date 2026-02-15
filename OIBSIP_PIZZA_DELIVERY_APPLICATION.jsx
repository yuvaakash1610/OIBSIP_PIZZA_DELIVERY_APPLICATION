import { useState, useEffect } from "react";

// ─── Mock Data ───────────────────────────────────────────────────────────────
const PIZZA_VARIETIES = [
  { id: 1, name: "Margherita", price: 249, tag: "Bestseller", desc: "Classic tomato, fresh mozzarella, basil", emoji: "🍕" },
  { id: 2, name: "BBQ Chicken", price: 349, tag: "Spicy", desc: "BBQ sauce, grilled chicken, red onion, cilantro", emoji: "🍗" },
  { id: 3, name: "Veggie Supreme", price: 299, tag: "Veg", desc: "Capsicum, mushroom, olives, onion, corn", emoji: "🥦" },
  { id: 4, name: "Pepperoni Blast", price: 379, tag: "Non-Veg", desc: "Double pepperoni, jalapeños, mozzarella", emoji: "🌶️" },
  { id: 5, name: "Paneer Tikka", price: 329, tag: "Chef's Special", desc: "Tikka sauce, paneer, capsicum, onion", emoji: "🧀" },
  { id: 6, name: "Farmhouse", price: 279, tag: "Veg", desc: "Fresh garden veggies, tangy sauce", emoji: "🌽" },
];

const BASES = [
  { id: "thin", label: "Thin Crust", price: 0, desc: "Crispy & light" },
  { id: "thick", label: "Thick Crust", price: 30, desc: "Soft & chewy" },
  { id: "stuffed", label: "Cheese Stuffed", price: 60, desc: "Extra indulgent" },
  { id: "multigrain", label: "Multigrain", price: 40, desc: "Healthy choice" },
  { id: "glutenfree", label: "Gluten Free", price: 80, desc: "Dietary special" },
];

const SAUCES = [
  { id: "tomato", label: "Classic Tomato", price: 0, emoji: "🍅" },
  { id: "bbq", label: "BBQ Sauce", price: 20, emoji: "🔥" },
  { id: "pesto", label: "Pesto", price: 30, emoji: "🌿" },
  { id: "whitesauce", label: "White Sauce", price: 25, emoji: "🥛" },
  { id: "spicy", label: "Spicy Arrabbiata", price: 20, emoji: "🌶️" },
];

const CHEESES = [
  { id: "mozzarella", label: "Mozzarella", price: 0, emoji: "🧀" },
  { id: "cheddar", label: "Cheddar", price: 30, emoji: "🟡" },
  { id: "parmesan", label: "Parmesan", price: 40, emoji: "⭐" },
  { id: "vegan", label: "Vegan Cheese", price: 50, emoji: "🌱" },
];

const VEGGIES = [
  { id: "capsicum", label: "Capsicum", price: 15 },
  { id: "mushroom", label: "Mushroom", price: 20 },
  { id: "onion", label: "Onion", price: 10 },
  { id: "olives", label: "Olives", price: 25 },
  { id: "corn", label: "Sweet Corn", price: 15 },
  { id: "jalapeno", label: "Jalapeño", price: 20 },
  { id: "tomato", label: "Fresh Tomato", price: 10 },
  { id: "spinach", label: "Baby Spinach", price: 20 },
];

const ORDER_STATUSES = [
  { key: "placed", label: "Order Placed", icon: "📋", color: "#3b82f6" },
  { key: "received", label: "Order Received", icon: "✅", color: "#8b5cf6" },
  { key: "kitchen", label: "In the Kitchen", icon: "👨‍🍳", color: "#f59e0b" },
  { key: "delivery", label: "Sent to Delivery", icon: "🚴", color: "#10b981" },
  { key: "delivered", label: "Delivered", icon: "🎉", color: "#059669" },
];

// ─── Simulated order tracker (cycles status for demo) ────────────────────────
const STATUS_CYCLE = ["placed", "received", "kitchen", "delivery", "delivered"];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const formatPrice = (p) => `₹${p}`;

function computeCustomPrice(build) {
  if (!build.base || !build.sauce || !build.cheese) return 0;
  const base = BASES.find((b) => b.id === build.base)?.price || 0;
  const sauce = SAUCES.find((s) => s.id === build.sauce)?.price || 0;
  const cheese = CHEESES.find((c) => c.id === build.cheese)?.price || 0;
  const veggies = build.veggies.reduce((s, v) => {
    const item = VEGGIES.find((x) => x.id === v);
    return s + (item?.price || 0);
  }, 0);
  return 199 + base + sauce + cheese + veggies; // base pizza cost ₹199
}

// ─── Razorpay mock ───────────────────────────────────────────────────────────
function mockRazorpay({ amount, name, onSuccess }) {
  return new Promise((resolve) => {
    // In a real app: window.Razorpay({ key, amount, ... }).open()
    const modal = document.createElement("div");
    modal.innerHTML = `
      <div style="position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;z-index:9999;font-family:'Nunito',sans-serif;">
        <div style="background:#fff;border-radius:16px;padding:36px;width:360px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.25);">
          <div style="font-size:32px;margin-bottom:8px;">💳</div>
          <div style="font-weight:800;font-size:18px;color:#1e1e2e;margin-bottom:4px;">Razorpay Checkout</div>
          <div style="font-size:13px;color:#6b7280;margin-bottom:20px;">Test Mode</div>
          <div style="background:#f3f4f6;border-radius:10px;padding:16px;margin-bottom:24px;">
            <div style="font-size:13px;color:#6b7280;">Amount to Pay</div>
            <div style="font-size:28px;font-weight:800;color:#1e1e2e;">₹${amount}</div>
            <div style="font-size:12px;color:#9ca3af;">for: ${name}</div>
          </div>
          <div style="font-size:11px;color:#9ca3af;margin-bottom:16px;">Use test card: 4111 1111 1111 1111 | Any future date | CVV: 123</div>
          <button id="pay-success" style="width:100%;padding:13px;background:#f97316;color:#fff;border:none;border-radius:10px;font-weight:700;font-size:15px;cursor:pointer;margin-bottom:10px;">✅ Pay & Place Order</button>
          <button id="pay-cancel" style="width:100%;padding:12px;background:#f3f4f6;color:#6b7280;border:none;border-radius:10px;font-size:14px;cursor:pointer;">Cancel</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
    document.getElementById("pay-success").onclick = () => {
      document.body.removeChild(modal);
      resolve({ success: true });
    };
    document.getElementById("pay-cancel").onclick = () => {
      document.body.removeChild(modal);
      resolve({ success: false });
    };
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Badge({ children, color = "#f97316" }) {
  return (
    <span style={{
      background: color + "18", color, fontSize: 10, fontWeight: 700,
      padding: "2px 8px", borderRadius: 20, letterSpacing: ".04em",
      textTransform: "uppercase"
    }}>{children}</span>
  );
}

function StepDot({ step, current }) {
  const done = current > step;
  const active = current === step;
  return (
    <div style={{
      width: 32, height: 32, borderRadius: "50%",
      background: done ? "#f97316" : active ? "#fff3eb" : "#f3f4f6",
      border: `2px solid ${done || active ? "#f97316" : "#e5e7eb"}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 13, fontWeight: 700, color: done ? "#fff" : active ? "#f97316" : "#9ca3af",
      flexShrink: 0, transition: "all .3s"
    }}>
      {done ? "✓" : step}
    </div>
  );
}

function OrderStatusTracker({ status }) {
  const idx = STATUS_CYCLE.indexOf(status);
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 0, overflowX: "auto", paddingBottom: 8 }}>
        {ORDER_STATUSES.map((s, i) => {
          const done = i <= idx;
          const active = STATUS_CYCLE[idx] === s.key;
          return (
            <div key={s.key} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 72 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: done ? s.color : "#f3f4f6",
                  border: `2px solid ${done ? s.color : "#e5e7eb"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, transition: "all .4s",
                  boxShadow: active ? `0 0 0 4px ${s.color}22` : "none"
                }}>{s.icon}</div>
                <span style={{ fontSize: 10, fontWeight: 600, color: done ? s.color : "#9ca3af", textAlign: "center", maxWidth: 68 }}>{s.label}</span>
              </div>
              {i < ORDER_STATUSES.length - 1 && (
                <div style={{ width: 28, height: 2, background: i < idx ? "#f97316" : "#e5e7eb", flexShrink: 0, margin: "0 2px", marginTop: -16, transition: "background .4s" }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function UserDashboard() {
  const [tab, setTab] = useState("menu"); // menu | build | orders
  const [buildStep, setBuildStep] = useState(1); // 1-4
  const [build, setBuild] = useState({ base: "", sauce: "", cheese: "", veggies: [] });
  const [cart, setCart] = useState([]); // {id, name, price, type:'variety'|'custom', details}
  const [orders, setOrders] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [statusDemo, setStatusDemo] = useState({}); // orderId -> index for demo

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  // Simulate real-time status updates for demo
  useEffect(() => {
    if (orders.length === 0) return;
    const interval = setInterval(() => {
      setOrders((prev) =>
        prev.map((o) => {
          const curIdx = STATUS_CYCLE.indexOf(o.status);
          if (curIdx < STATUS_CYCLE.length - 1) {
            return { ...o, status: STATUS_CYCLE[curIdx + 1] };
          }
          return o;
        })
      );
    }, 6000);
    return () => clearInterval(interval);
  }, [orders.length]);

  function addVarietyToCart(pizza) {
    setCart((c) => [...c, { uid: Date.now(), name: pizza.name, price: pizza.price, type: "variety", emoji: pizza.emoji }]);
    showToast(`${pizza.name} added to cart! 🍕`);
  }

  function addCustomToCart() {
    const price = computeCustomPrice(build);
    const details = {
      base: BASES.find((b) => b.id === build.base)?.label,
      sauce: SAUCES.find((s) => s.id === build.sauce)?.label,
      cheese: CHEESES.find((c) => c.id === build.cheese)?.label,
      veggies: build.veggies.map((v) => VEGGIES.find((x) => x.id === v)?.label).join(", "),
    };
    setCart((c) => [...c, { uid: Date.now(), name: "Custom Pizza", price, type: "custom", emoji: "🛠️", details }]);
    setBuild({ base: "", sauce: "", cheese: "", veggies: [] });
    setBuildStep(1);
    setTab("menu");
    showToast("Custom pizza added to cart! 🎉");
    setCartOpen(true);
  }

  function removeFromCart(uid) {
    setCart((c) => c.filter((i) => i.uid !== uid));
  }

  const cartTotal = cart.reduce((s, i) => s + i.price, 0);

  async function handleCheckout() {
    if (cart.length === 0) return;
    const result = await mockRazorpay({
      amount: cartTotal,
      name: cart.map((i) => i.name).join(", "),
    });
    if (result.success) {
      const newOrder = {
        id: "ORD" + Date.now().toString().slice(-6),
        items: [...cart],
        total: cartTotal,
        status: "placed",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        date: new Date().toLocaleDateString(),
      };
      setOrders((o) => [newOrder, ...o]);
      setCart([]);
      setCartOpen(false);
      setTab("orders");
      showToast("Order placed successfully! 🎊", "success");
    }
  }

  const toggleVeggie = (id) => {
    setBuild((b) => ({
      ...b,
      veggies: b.veggies.includes(id) ? b.veggies.filter((v) => v !== id) : [...b.veggies, id],
    }));
  };

  const canProceed = (step) => {
    if (step === 1) return !!build.base;
    if (step === 2) return !!build.sauce;
    if (step === 3) return !!build.cheese;
    return true;
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Nunito', 'Segoe UI', sans-serif", background: "#fafafa", minHeight: "100vh", color: "#1e1e2e" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
        .card { background: #fff; border-radius: 14px; border: 1px solid #f0f0f0; box-shadow: 0 1px 4px rgba(0,0,0,.04); }
        .tab-btn { padding: 9px 20px; border-radius: 10px; border: none; cursor: pointer; font-family: inherit; font-weight: 700; font-size: 14px; transition: all .2s; }
        .option-card { border: 2px solid #e5e7eb; border-radius: 12px; padding: 14px; cursor: pointer; transition: all .2s; background: #fff; }
        .option-card:hover { border-color: #f97316; transform: translateY(-1px); }
        .option-card.selected { border-color: #f97316; background: #fff7f0; }
        .veggie-chip { padding: 8px 14px; border-radius: 20px; border: 2px solid #e5e7eb; cursor: pointer; font-size: 13px; font-weight: 700; transition: all .2s; background: #fff; }
        .veggie-chip:hover { border-color: #f97316; }
        .veggie-chip.selected { border-color: #f97316; background: #fff7f0; color: #f97316; }
        .cart-item { display: flex; align-items: center; gap: 10px; padding: 12px 0; border-bottom: 1px solid #f3f4f6; }
        .pizza-card:hover { box-shadow: 0 8px 24px rgba(249,115,22,.12); transform: translateY(-2px); }
        .pizza-card { transition: all .25s; }
        .next-btn { background: #f97316; color: #fff; border: none; border-radius: 12px; padding: 13px 28px; font-size: 15px; font-weight: 800; cursor: pointer; font-family: inherit; transition: all .2s; }
        .next-btn:hover { background: #ea6c0a; transform: translateY(-1px); }
        .next-btn:disabled { background: #d1d5db; cursor: not-allowed; transform: none; }
        .checkout-btn { background: linear-gradient(135deg, #f97316, #ef4444); color: #fff; border: none; border-radius: 12px; padding: 15px; font-size: 16px; font-weight: 800; cursor: pointer; font-family: inherit; width: 100%; transition: all .2s; }
        .checkout-btn:hover { opacity: .92; transform: translateY(-1px); }
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn .3s ease; }
        .toast { position: fixed; top: 20px; right: 20px; background: #1e1e2e; color: #fff; padding: 12px 20px; border-radius: 12px; font-weight: 700; font-size: 14px; z-index: 9000; animation: slideIn .3s ease; box-shadow: 0 8px 24px rgba(0,0,0,.2); max-width: 320px; }
      `}</style>

      {/* ── TOAST ── */}
      {toast && <div className="toast">{toast.msg}</div>}

      {/* ── HEADER ── */}
      <header style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, background: "linear-gradient(135deg, #f97316, #ef4444)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🍕</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18, color: "#1e1e2e" }}>PizzaCraft</div>
            <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}>User Dashboard</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          {[
            { key: "menu", icon: "🍕", label: "Menu" },
            { key: "build", icon: "🛠️", label: "Build Pizza" },
            { key: "orders", icon: "📦", label: `Orders${orders.length ? ` (${orders.length})` : ""}` },
          ].map((t) => (
            <button key={t.key} className="tab-btn"
              onClick={() => { setTab(t.key); if (t.key === "build") setBuildStep(1); }}
              style={{ background: tab === t.key ? "#fff7f0" : "transparent", color: tab === t.key ? "#f97316" : "#6b7280", border: tab === t.key ? "2px solid #f97316" : "2px solid transparent" }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <button onClick={() => setCartOpen(true)} style={{
          position: "relative", background: "#fff7f0", border: "2px solid #f97316",
          borderRadius: 12, padding: "9px 18px", cursor: "pointer", fontWeight: 800,
          fontSize: 14, color: "#f97316", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6
        }}>
          🛒 Cart
          {cart.length > 0 && (
            <span style={{ background: "#ef4444", color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 10, fontWeight: 900, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              {cart.length}
            </span>
          )}
        </button>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main style={{ padding: "24px", maxWidth: 1100, margin: "0 auto" }}>

        {/* ═══════════════ MENU TAB ═══════════════ */}
        {tab === "menu" && (
          <div className="fade-in">
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontSize: 26, fontWeight: 900 }}>🍕 Our Pizza Menu</h1>
              <p style={{ color: "#6b7280", fontSize: 14, marginTop: 4 }}>Choose from our chef-curated varieties or build your own!</p>
            </div>

            {/* Build CTA Banner */}
            <div style={{ background: "linear-gradient(135deg, #fff7f0, #fff3eb)", border: "2px solid #fed7aa", borderRadius: 16, padding: "18px 24px", marginBottom: 28, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontWeight: 900, fontSize: 17, color: "#c2410c" }}>🛠️ Build Your Own Pizza</div>
                <div style={{ fontSize: 13, color: "#9a3412", marginTop: 2 }}>Choose base → sauce → cheese → veggies. Starting at ₹199</div>
              </div>
              <button className="next-btn" onClick={() => { setTab("build"); setBuildStep(1); }}>
                Start Building →
              </button>
            </div>

            {/* Pizza Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
              {PIZZA_VARIETIES.map((p) => (
                <div key={p.id} className="card pizza-card" style={{ padding: 20, position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div style={{ fontSize: 48 }}>{p.emoji}</div>
                    <Badge color={p.tag === "Bestseller" ? "#f59e0b" : p.tag === "Spicy" ? "#ef4444" : p.tag.includes("Veg") ? "#10b981" : "#6366f1"}>{p.tag}</Badge>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 4 }}>{p.name}</div>
                  <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 14, lineHeight: 1.5 }}>{p.desc}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 900, fontSize: 20, color: "#f97316" }}>{formatPrice(p.price)}</span>
                    <button onClick={() => addVarietyToCart(p)} style={{
                      background: "#f97316", color: "#fff", border: "none", borderRadius: 10,
                      padding: "9px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit"
                    }}>+ Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════ BUILD PIZZA TAB ═══════════════ */}
        {tab === "build" && (
          <div className="fade-in">
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontSize: 26, fontWeight: 900 }}>🛠️ Build Your Pizza</h1>
              <p style={{ color: "#6b7280", fontSize: 14, marginTop: 4 }}>Customize every layer of your perfect pizza</p>
            </div>

            {/* Progress Steps */}
            <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 32, overflowX: "auto", paddingBottom: 4 }}>
              {["Choose Base", "Pick Sauce", "Select Cheese", "Add Veggies"].map((label, i) => {
                const step = i + 1;
                const done = buildStep > step;
                const active = buildStep === step;
                return (
                  <div key={label} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 80 }}>
                      <StepDot step={step} current={buildStep} />
                      <span style={{ fontSize: 11, fontWeight: 700, color: done ? "#f97316" : active ? "#1e1e2e" : "#9ca3af", textAlign: "center" }}>{label}</span>
                    </div>
                    {i < 3 && <div style={{ width: 40, height: 2, background: done ? "#f97316" : "#e5e7eb", margin: "0 4px", marginTop: -18, flexShrink: 0 }} />}
                  </div>
                );
              })}
            </div>

            {/* Live Price Preview */}
            <div style={{ background: "#fff7f0", border: "2px solid #fed7aa", borderRadius: 12, padding: "12px 18px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {build.base && <span style={{ fontSize: 13, color: "#6b7280" }}>🍞 {BASES.find(b => b.id === build.base)?.label}</span>}
                {build.sauce && <span style={{ fontSize: 13, color: "#6b7280" }}>🍅 {SAUCES.find(s => s.id === build.sauce)?.label}</span>}
                {build.cheese && <span style={{ fontSize: 13, color: "#6b7280" }}>🧀 {CHEESES.find(c => c.id === build.cheese)?.label}</span>}
                {build.veggies.length > 0 && <span style={{ fontSize: 13, color: "#6b7280" }}>🥦 {build.veggies.length} veggies</span>}
              </div>
              <div style={{ fontWeight: 900, fontSize: 20, color: "#f97316" }}>
                {build.base && build.sauce && build.cheese ? formatPrice(computeCustomPrice(build)) : "—"}
              </div>
            </div>

            {/* ── STEP 1: Base ── */}
            {buildStep === 1 && (
              <div className="fade-in">
                <h3 style={{ fontWeight: 800, fontSize: 18, marginBottom: 16 }}>Step 1 — Choose Your Base</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
                  {BASES.map((b) => (
                    <div key={b.id} className={`option-card ${build.base === b.id ? "selected" : ""}`}
                      onClick={() => setBuild((prev) => ({ ...prev, base: b.id }))}>
                      <div style={{ fontSize: 28, marginBottom: 8 }}>🫓</div>
                      <div style={{ fontWeight: 800, fontSize: 15 }}>{b.label}</div>
                      <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 3 }}>{b.desc}</div>
                      <div style={{ fontWeight: 700, color: "#f97316", marginTop: 8, fontSize: 13 }}>
                        {b.price === 0 ? "Included" : `+${formatPrice(b.price)}`}
                      </div>
                      {build.base === b.id && <div style={{ marginTop: 8, color: "#f97316", fontSize: 11, fontWeight: 700 }}>✓ Selected</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── STEP 2: Sauce ── */}
            {buildStep === 2 && (
              <div className="fade-in">
                <h3 style={{ fontWeight: 800, fontSize: 18, marginBottom: 16 }}>Step 2 — Pick Your Sauce</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
                  {SAUCES.map((s) => (
                    <div key={s.id} className={`option-card ${build.sauce === s.id ? "selected" : ""}`}
                      onClick={() => setBuild((prev) => ({ ...prev, sauce: s.id }))}>
                      <div style={{ fontSize: 28, marginBottom: 8 }}>{s.emoji}</div>
                      <div style={{ fontWeight: 800, fontSize: 15 }}>{s.label}</div>
                      <div style={{ fontWeight: 700, color: "#f97316", marginTop: 8, fontSize: 13 }}>
                        {s.price === 0 ? "Included" : `+${formatPrice(s.price)}`}
                      </div>
                      {build.sauce === s.id && <div style={{ marginTop: 8, color: "#f97316", fontSize: 11, fontWeight: 700 }}>✓ Selected</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── STEP 3: Cheese ── */}
            {buildStep === 3 && (
              <div className="fade-in">
                <h3 style={{ fontWeight: 800, fontSize: 18, marginBottom: 16 }}>Step 3 — Select Cheese Type</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
                  {CHEESES.map((c) => (
                    <div key={c.id} className={`option-card ${build.cheese === c.id ? "selected" : ""}`}
                      onClick={() => setBuild((prev) => ({ ...prev, cheese: c.id }))}>
                      <div style={{ fontSize: 28, marginBottom: 8 }}>{c.emoji}</div>
                      <div style={{ fontWeight: 800, fontSize: 15 }}>{c.label}</div>
                      <div style={{ fontWeight: 700, color: "#f97316", marginTop: 8, fontSize: 13 }}>
                        {c.price === 0 ? "Included" : `+${formatPrice(c.price)}`}
                      </div>
                      {build.cheese === c.id && <div style={{ marginTop: 8, color: "#f97316", fontSize: 11, fontWeight: 700 }}>✓ Selected</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── STEP 4: Veggies ── */}
            {buildStep === 4 && (
              <div className="fade-in">
                <h3 style={{ fontWeight: 800, fontSize: 18, marginBottom: 6 }}>Step 4 — Choose Your Veggies</h3>
                <p style={{ color: "#9ca3af", fontSize: 13, marginBottom: 20 }}>Select as many as you like. All optional!</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
                  {VEGGIES.map((v) => (
                    <button key={v.id} className={`veggie-chip ${build.veggies.includes(v.id) ? "selected" : ""}`}
                      onClick={() => toggleVeggie(v.id)}>
                      {build.veggies.includes(v.id) ? "✓ " : ""}{v.label}
                      <span style={{ color: "#f97316", marginLeft: 6, fontSize: 12 }}>+₹{v.price}</span>
                    </button>
                  ))}
                </div>
                <div className="card" style={{ padding: 20, marginBottom: 20 }}>
                  <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 12 }}>🍕 Your Custom Pizza Summary</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 14, color: "#374151" }}>
                    <div><span style={{ color: "#9ca3af" }}>Base:</span> {BASES.find(b => b.id === build.base)?.label}</div>
                    <div><span style={{ color: "#9ca3af" }}>Sauce:</span> {SAUCES.find(s => s.id === build.sauce)?.label}</div>
                    <div><span style={{ color: "#9ca3af" }}>Cheese:</span> {CHEESES.find(c => c.id === build.cheese)?.label}</div>
                    <div><span style={{ color: "#9ca3af" }}>Veggies:</span> {build.veggies.length > 0 ? build.veggies.map(v => VEGGIES.find(x => x.id === v)?.label).join(", ") : "None"}</div>
                  </div>
                  <div style={{ borderTop: "2px dashed #f3f4f6", marginTop: 16, paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, color: "#6b7280" }}>Total</span>
                    <span style={{ fontWeight: 900, fontSize: 22, color: "#f97316" }}>{formatPrice(computeCustomPrice(build))}</span>
                  </div>
                </div>
                <button className="next-btn" style={{ width: "100%", fontSize: 16 }} onClick={addCustomToCart}>
                  🛒 Add Custom Pizza to Cart
                </button>
              </div>
            )}

            {/* Navigation Buttons */}
            {buildStep < 4 && (
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
                <button className="tab-btn" onClick={() => setBuildStep((s) => Math.max(1, s - 1))}
                  style={{ background: "#f3f4f6", color: "#6b7280", display: buildStep === 1 ? "none" : "block" }}>
                  ← Back
                </button>
                <button className="next-btn" style={{ marginLeft: "auto" }}
                  disabled={!canProceed(buildStep)}
                  onClick={() => setBuildStep((s) => s + 1)}>
                  Next Step →
                </button>
              </div>
            )}
            {buildStep > 1 && buildStep < 4 && (
              <div />
            )}
          </div>
        )}

        {/* ═══════════════ ORDERS TAB ═══════════════ */}
        {tab === "orders" && (
          <div className="fade-in">
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontSize: 26, fontWeight: 900 }}>📦 My Orders</h1>
              <p style={{ color: "#6b7280", fontSize: 14, marginTop: 4 }}>
                {orders.length > 0 ? "Track your order status in real-time — updates every few seconds in demo mode." : "No orders yet. Go to Menu to order!"}
              </p>
            </div>

            {orders.length === 0 && (
              <div className="card" style={{ padding: 48, textAlign: "center" }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>🍕</div>
                <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>No orders yet!</div>
                <div style={{ color: "#9ca3af", marginBottom: 20 }}>Order some delicious pizza to get started.</div>
                <button className="next-btn" onClick={() => setTab("menu")}>Browse Menu →</button>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {orders.map((order) => (
                <div key={order.id} className="card" style={{ padding: 24 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 900, fontSize: 16 }}>#{order.id}</span>
                        <Badge color={
                          order.status === "delivered" ? "#10b981" :
                          order.status === "delivery" ? "#3b82f6" :
                          order.status === "kitchen" ? "#f59e0b" : "#6366f1"
                        }>
                          {ORDER_STATUSES.find(s => s.key === order.status)?.label}
                        </Badge>
                      </div>
                      <div style={{ color: "#9ca3af", fontSize: 12, marginTop: 4 }}>{order.date} · {order.time}</div>
                    </div>
                    <div style={{ fontWeight: 900, fontSize: 20, color: "#f97316" }}>{formatPrice(order.total)}</div>
                  </div>

                  {/* Items */}
                  <div style={{ background: "#f9fafb", borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
                    {order.items.map((item, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < order.items.length - 1 ? "1px solid #f3f4f6" : "none", fontSize: 14 }}>
                        <span>{item.emoji} {item.name} {item.type === "custom" && <Badge color="#8b5cf6">Custom</Badge>}</span>
                        <span style={{ fontWeight: 700 }}>{formatPrice(item.price)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Status Tracker */}
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "#6b7280", marginBottom: 8 }}>ORDER STATUS TRACKER</div>
                    <OrderStatusTracker status={order.status} />
                    {order.status !== "delivered" && (
                      <div style={{ marginTop: 12, fontSize: 12, color: "#9ca3af", fontStyle: "italic" }}>
                        🔄 Status updates automatically (demo: every 6 seconds)
                      </div>
                    )}
                    {order.status === "delivered" && (
                      <div style={{ marginTop: 12, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "10px 14px", fontSize: 13, fontWeight: 700, color: "#16a34a" }}>
                        🎉 Delivered! Enjoy your pizza!
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ═══════════════ CART DRAWER ═══════════════ */}
      {cartOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.4)" }} onClick={() => setCartOpen(false)} />
          <div style={{
            position: "absolute", top: 0, right: 0, bottom: 0, width: 360,
            background: "#fff", boxShadow: "-4px 0 24px rgba(0,0,0,.12)",
            display: "flex", flexDirection: "column", animation: "slideIn .3s ease"
          }}>
            {/* Cart Header */}
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontWeight: 900, fontSize: 18 }}>🛒 Your Cart</div>
              <button onClick={() => setCartOpen(false)} style={{ background: "#f3f4f6", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>✕</button>
            </div>

            {/* Cart Items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "0 24px" }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", paddingTop: 60, color: "#9ca3af" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🍕</div>
                  <div style={{ fontWeight: 700 }}>Cart is empty</div>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.uid} className="cart-item">
                    <div style={{ fontSize: 28, flexShrink: 0 }}>{item.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{item.name}</div>
                      {item.details && (
                        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2, lineHeight: 1.4 }}>
                          {item.details.base} · {item.details.sauce} · {item.details.cheese}
                        </div>
                      )}
                      <div style={{ fontWeight: 800, color: "#f97316", fontSize: 14, marginTop: 3 }}>{formatPrice(item.price)}</div>
                    </div>
                    <button onClick={() => removeFromCart(item.uid)} style={{ background: "#fef2f2", border: "none", borderRadius: 8, width: 28, height: 28, cursor: "pointer", color: "#ef4444", fontWeight: 700, flexShrink: 0 }}>✕</button>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div style={{ padding: 24, borderTop: "1px solid #f0f0f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: "#6b7280", fontSize: 14 }}>Subtotal</span>
                  <span style={{ fontWeight: 700 }}>{formatPrice(cartTotal)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: "#6b7280", fontSize: 14 }}>Delivery</span>
                  <span style={{ fontWeight: 700, color: "#10b981" }}>Free</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, paddingTop: 12, borderTop: "2px dashed #f3f4f6" }}>
                  <span style={{ fontWeight: 900, fontSize: 16 }}>Total</span>
                  <span style={{ fontWeight: 900, fontSize: 20, color: "#f97316" }}>{formatPrice(cartTotal)}</span>
                </div>
                <button className="checkout-btn" onClick={handleCheckout}>
                  💳 Pay with Razorpay · {formatPrice(cartTotal)}
                </button>
                <div style={{ textAlign: "center", fontSize: 11, color: "#9ca3af", marginTop: 10 }}>🔒 Secured by Razorpay (Test Mode)</div>
                </div>)}
                </div>
              </div>
      )}
    </div>
  );
}
