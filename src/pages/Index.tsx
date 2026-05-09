import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/f065db28-d5d2-454e-97d3-0916141546c7/files/71761fec-75b5-400c-bdbe-3e6b61be62e3.jpg";

const services = [
  { icon: "Paintbrush", name: "Покраска стен", desc: "Выравнивание, грунтовка, окраска" },
  { icon: "Layers", name: "Укладка плитки", desc: "Ванная, кухня, коридор" },
  { icon: "Zap", name: "Электрика", desc: "Розетки, выключатели, проводка" },
  { icon: "Droplets", name: "Сантехника", desc: "Установка и замена оборудования" },
  { icon: "SquareStack", name: "Натяжные потолки", desc: "Любые формы и размеры" },
  { icon: "DoorOpen", name: "Установка дверей", desc: "Межкомнатные и входные" },
];

const prices = [
  { service: "Поклейка обоев", unit: "м²", price: "от 250 ₽" },
  { service: "Покраска стен", unit: "м²", price: "от 200 ₽" },
  { service: "Укладка плитки", unit: "м²", price: "от 800 ₽" },
  { service: "Штукатурка стен", unit: "м²", price: "от 350 ₽" },
  { service: "Укладка ламината", unit: "м²", price: "от 400 ₽" },
  { service: "Установка розетки", unit: "шт", price: "от 500 ₽" },
  { service: "Замена смесителя", unit: "шт", price: "от 800 ₽" },
  { service: "Установка двери", unit: "шт", price: "от 3 500 ₽" },
  { service: "Натяжной потолок", unit: "м²", price: "от 600 ₽" },
  { service: "Выравнивание пола", unit: "м²", price: "от 450 ₽" },
];

const reviews = [
  {
    name: "Анна К.",
    rating: 5,
    text: "Делали ремонт в ванной — всё идеально! Мастер пришёл вовремя, работал аккуратно, убрал за собой. Результат превзошёл ожидания.",
    date: "15 апреля 2025",
  },
  {
    name: "Дмитрий В.",
    rating: 5,
    text: "Уложил плитку на кухне и в коридоре. Швы ровные, стыки красивые. Цена честная, без скрытых накруток. Рекомендую!",
    date: "3 марта 2025",
  },
  {
    name: "Марина С.",
    rating: 5,
    text: "Заменили электрику в квартире. Быстро, профессионально. Мастер объяснил что и зачем делает. Отличный специалист!",
    date: "18 февраля 2025",
  },
  {
    name: "Игорь П.",
    rating: 4,
    text: "Поклеили обои в трёх комнатах. Работа выполнена на совесть, рисунок совпадает идеально. Обязательно обращусь снова.",
    date: "7 января 2025",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: "#hero", label: "Главная" },
    { href: "#services", label: "Услуги" },
    { href: "#prices", label: "Цены" },
    { href: "#reviews", label: "Отзывы" },
    { href: "#contacts", label: "Контакты" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#2A2A2A]" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#hero" className="font-oswald text-xl font-bold tracking-wider">
          <span className="text-white">МАСТЕР</span>
          <span style={{ color: "#FF6B00" }}>.</span>
          <span style={{ color: "#FF6B00" }}>РУ</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="font-ibm text-sm text-[#888] hover:text-white transition-colors duration-200 tracking-wide uppercase">
              {l.label}
            </a>
          ))}
        </div>
        <a href="#contacts"
          className="hidden md:inline-flex items-center gap-2 font-oswald font-semibold text-sm px-5 py-2.5 rounded-full hover:brightness-110 transition-all duration-200"
          style={{ backgroundColor: "#FF6B00", color: "#0A0A0A" }}>
          Вызвать мастера
        </a>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
          <Icon name={open ? "X" : "Menu"} size={22} />
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#0A0A0A]/98 border-t border-[#2A2A2A] px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="font-ibm text-sm text-[#888] hover:text-white transition-colors uppercase tracking-wide py-1">
              {l.label}
            </a>
          ))}
          <a href="#contacts" onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center font-oswald font-semibold text-sm px-5 py-3 rounded-full"
            style={{ backgroundColor: "#FF6B00", color: "#0A0A0A" }}>
            Вызвать мастера
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMAGE} alt="Ремонт" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(255,107,0,0.1)" }} />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(255,214,0,0.05)" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-full px-4 py-2 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#FF6B00" }} />
            <span className="font-ibm text-xs text-[#888] tracking-widest uppercase">Принимаем заявки</span>
          </div>

          <h1 className="font-oswald text-6xl md:text-8xl font-bold leading-none mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <span className="text-white block">ПРОФИ</span>
            <span className="block" style={{ background: "linear-gradient(135deg, #FF6B00, #FFD600)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>РЕМОНТ</span>
            <span className="text-white block">КВАРТИР</span>
          </h1>

          <p className="font-ibm text-lg text-[#888] leading-relaxed mb-10 max-w-lg animate-fade-in" style={{ animationDelay: "200ms" }}>
            Качественный ремонт под ключ и отдельные виды работ. Более 10 лет опыта, гарантия на все работы, без посредников.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <a href="#contacts"
              className="inline-flex items-center justify-center gap-2 font-oswald font-bold text-base px-8 py-4 rounded-full hover:brightness-110 transition-all duration-200"
              style={{ backgroundColor: "#FF6B00", color: "#0A0A0A", boxShadow: "0 0 30px rgba(255,107,0,0.5)" }}>
              <Icon name="Phone" size={18} />
              Вызвать мастера
            </a>
            <a href="#prices"
              className="inline-flex items-center justify-center gap-2 border text-white font-oswald font-semibold text-base px-8 py-4 rounded-full hover:text-[#FF6B00] transition-all duration-200"
              style={{ borderColor: "#2A2A2A" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#FF6B00")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "#2A2A2A")}>
              <Icon name="List" size={18} />
              Прайс-лист
            </a>
          </div>

          <div className="flex gap-10 mt-14 animate-fade-in" style={{ animationDelay: "400ms" }}>
            {[
              { value: "10+", label: "лет опыта" },
              { value: "500+", label: "объектов сдано" },
              { value: "100%", label: "гарантия" },
            ].map(stat => (
              <div key={stat.label}>
                <div className="font-oswald text-3xl font-bold" style={{ color: "#FF6B00" }}>{stat.value}</div>
                <div className="font-ibm text-xs text-[#555] uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={24} className="text-[#444]" />
      </div>
    </section>
  );
}

function Services() {
  const { ref, inView } = useInView();
  return (
    <section id="services" className="py-24 bg-[#0A0A0A]" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`mb-16 ${inView ? "animate-fade-in" : "opacity-0"}`}>
          <div className="font-ibm text-xs uppercase tracking-[4px] mb-4" style={{ color: "#FF6B00" }}>Что мы делаем</div>
          <h2 className="font-oswald text-5xl md:text-6xl font-bold text-white">
            НАШИ{" "}
            <span style={{ background: "linear-gradient(135deg, #FF6B00, #FFD600)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>УСЛУГИ</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <div key={s.name}
              className={`rounded-2xl p-6 group transition-all duration-300 cursor-default ${inView ? "animate-fade-in" : "opacity-0"}`}
              style={{
                background: "#141414",
                border: "1px solid #2A2A2A",
                animationDelay: `${Math.min((i + 1) * 100, 600)}ms`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,107,0,0.4)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 12px rgba(255,107,0,0.3)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#2A2A2A";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-200"
                style={{ background: "rgba(255,107,0,0.1)" }}>
                <Icon name={s.icon} size={22} style={{ color: "#FF6B00" }} />
              </div>
              <h3 className="font-oswald text-lg font-semibold text-white mb-2">{s.name}</h3>
              <p className="font-ibm text-sm text-[#666]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Prices() {
  const { ref, inView } = useInView();
  return (
    <section id="prices" className="py-24 bg-[#0D0D0D]" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`mb-16 ${inView ? "animate-fade-in" : "opacity-0"}`}>
          <div className="font-ibm text-xs uppercase tracking-[4px] mb-4" style={{ color: "#FF6B00" }}>Прозрачно и честно</div>
          <h2 className="font-oswald text-5xl md:text-6xl font-bold text-white">
            ЦЕНЫ НА{" "}
            <span style={{ background: "linear-gradient(135deg, #FF6B00, #FFD600)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>РАБОТЫ</span>
          </h2>
        </div>

        <div className={`rounded-2xl overflow-hidden ${inView ? "animate-scale-in" : "opacity-0"}`}
          style={{ background: "#141414", border: "1px solid #2A2A2A" }}>
          <div className="grid grid-cols-3 px-6 py-3 border-b" style={{ background: "#1A1A1A", borderColor: "#2A2A2A" }}>
            <div className="font-ibm text-xs text-[#555] uppercase tracking-wider">Услуга</div>
            <div className="font-ibm text-xs text-[#555] uppercase tracking-wider text-center">Единица</div>
            <div className="font-ibm text-xs text-[#555] uppercase tracking-wider text-right">Стоимость</div>
          </div>
          {prices.map((row, i) => (
            <div key={row.service}
              className={`grid grid-cols-3 px-6 py-4 border-b last:border-0 transition-colors duration-150 group ${inView ? "animate-fade-in" : "opacity-0"}`}
              style={{ borderColor: "#1A1A1A", animationDelay: `${Math.min((i + 1) * 80, 600)}ms` }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "rgba(255,107,0,0.05)"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "transparent"}>
              <div className="font-ibm text-sm text-white">{row.service}</div>
              <div className="font-ibm text-sm text-[#555] text-center">{row.unit}</div>
              <div className="font-oswald text-base font-semibold text-right" style={{ color: "#FF6B00" }}>{row.price}</div>
            </div>
          ))}
        </div>

        <p className="font-ibm text-xs text-[#444] mt-4 text-center">
          * Точная стоимость определяется после осмотра объекта. Выезд на замер — бесплатно.
        </p>
      </div>
    </section>
  );
}

function Reviews() {
  const { ref, inView } = useInView();
  return (
    <section id="reviews" className="py-24 bg-[#0A0A0A]" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`mb-16 ${inView ? "animate-fade-in" : "opacity-0"}`}>
          <div className="font-ibm text-xs uppercase tracking-[4px] mb-4" style={{ color: "#FF6B00" }}>Нам доверяют</div>
          <h2 className="font-oswald text-5xl md:text-6xl font-bold text-white">
            ОТЗЫВЫ{" "}
            <span style={{ background: "linear-gradient(135deg, #FF6B00, #FFD600)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>КЛИЕНТОВ</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((r, i) => (
            <div key={r.name}
              className={`rounded-2xl p-6 transition-all duration-300 ${inView ? "animate-fade-in" : "opacity-0"}`}
              style={{
                background: "#141414",
                border: "1px solid #2A2A2A",
                animationDelay: `${Math.min((i + 1) * 100, 500)}ms`,
              }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,107,0,0.3)"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "#2A2A2A"}>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Icon key={idx} name="Star" size={14}
                    style={{ color: idx < r.rating ? "#FFD600" : "#333" }} />
                ))}
              </div>
              <p className="font-ibm text-sm text-[#999] leading-relaxed mb-5">"{r.text}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,107,0,0.2)" }}>
                    <Icon name="User" size={14} style={{ color: "#FF6B00" }} />
                  </div>
                  <span className="font-oswald text-sm font-semibold text-white">{r.name}</span>
                </div>
                <span className="font-ibm text-xs text-[#444]">{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contacts() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  return (
    <section id="contacts" className="py-24 bg-[#0D0D0D]" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`mb-16 ${inView ? "animate-fade-in" : "opacity-0"}`}>
          <div className="font-ibm text-xs uppercase tracking-[4px] mb-4" style={{ color: "#FF6B00" }}>Свяжитесь с нами</div>
          <h2 className="font-oswald text-5xl md:text-6xl font-bold text-white">
            ЗАКАЗАТЬ{" "}
            <span style={{ background: "linear-gradient(135deg, #FF6B00, #FFD600)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>РЕМОНТ</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className={`space-y-4 ${inView ? "animate-fade-in-left" : "opacity-0"}`}>
            {[
              { icon: "Phone", label: "Телефон", value: "+7 (900) 000-00-00" },
              { icon: "MessageCircle", label: "WhatsApp / Telegram", value: "@master_remont" },
              { icon: "Clock", label: "Режим работы", value: "Пн–Вс, 8:00 — 21:00" },
              { icon: "MapPin", label: "Район работы", value: "Москва и МО" },
            ].map(item => (
              <div key={item.label}
                className="rounded-2xl p-5 flex items-center gap-4 transition-all duration-200"
                style={{ background: "#141414", border: "1px solid #2A2A2A" }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,107,0,0.3)"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "#2A2A2A"}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,107,0,0.1)" }}>
                  <Icon name={item.icon} size={18} style={{ color: "#FF6B00" }} />
                </div>
                <div>
                  <div className="font-ibm text-xs text-[#555] uppercase tracking-wider">{item.label}</div>
                  <div className="font-oswald text-base font-semibold text-white mt-0.5">{item.value}</div>
                </div>
              </div>
            ))}

            <div className="rounded-2xl p-6 mt-2" style={{ background: "linear-gradient(135deg, rgba(255,107,0,0.15), rgba(255,214,0,0.05))", border: "1px solid rgba(255,107,0,0.2)" }}>
              <div className="font-oswald text-2xl font-bold text-white mb-1">Замер — бесплатно</div>
              <div className="font-ibm text-sm text-[#888]">Приедем в удобное время, оценим объём работ и рассчитаем стоимость без обязательств</div>
            </div>
          </div>

          <div className={`rounded-2xl p-6 ${inView ? "animate-fade-in" : "opacity-0"}`}
            style={{ background: "#141414", border: "1px solid #2A2A2A", animationDelay: "200ms" }}>
            <h3 className="font-oswald text-xl font-bold text-white mb-6">Оставить заявку</h3>
            <div className="space-y-4">
              <div>
                <label className="font-ibm text-xs text-[#555] uppercase tracking-wider mb-2 block">Ваше имя</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Иван Иванов"
                  className="w-full rounded-xl px-4 py-3 font-ibm text-sm text-white placeholder-[#444] outline-none transition-colors"
                  style={{ background: "#0A0A0A", border: "1px solid #2A2A2A" }}
                  onFocus={e => (e.target.style.borderColor = "#FF6B00")}
                  onBlur={e => (e.target.style.borderColor = "#2A2A2A")}
                />
              </div>
              <div>
                <label className="font-ibm text-xs text-[#555] uppercase tracking-wider mb-2 block">Телефон</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full rounded-xl px-4 py-3 font-ibm text-sm text-white placeholder-[#444] outline-none transition-colors"
                  style={{ background: "#0A0A0A", border: "1px solid #2A2A2A" }}
                  onFocus={e => (e.target.style.borderColor = "#FF6B00")}
                  onBlur={e => (e.target.style.borderColor = "#2A2A2A")}
                />
              </div>
              <div>
                <label className="font-ibm text-xs text-[#555] uppercase tracking-wider mb-2 block">Что нужно сделать?</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Опишите вашу задачу..."
                  rows={4}
                  className="w-full rounded-xl px-4 py-3 font-ibm text-sm text-white placeholder-[#444] outline-none transition-colors resize-none"
                  style={{ background: "#0A0A0A", border: "1px solid #2A2A2A" }}
                  onFocus={e => (e.target.style.borderColor = "#FF6B00")}
                  onBlur={e => (e.target.style.borderColor = "#2A2A2A")}
                />
              </div>
              <button
                className="w-full font-oswald font-bold text-base py-4 rounded-xl hover:brightness-110 transition-all duration-200 flex items-center justify-center gap-2"
                style={{ backgroundColor: "#FF6B00", color: "#0A0A0A", boxShadow: "0 0 30px rgba(255,107,0,0.5)" }}>
                <Icon name="Send" size={18} />
                Отправить заявку
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t py-8 bg-[#0A0A0A]" style={{ borderColor: "#1A1A1A" }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-oswald text-lg font-bold">
          <span className="text-white">МАСТЕР</span>
          <span style={{ color: "#FF6B00" }}>.</span>
          <span style={{ color: "#FF6B00" }}>РУ</span>
        </div>
        <p className="font-ibm text-xs text-[#444]">© 2025 Профессиональный ремонт квартир. Все права защищены.</p>
      </div>
    </footer>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <NavBar />
      <Hero />
      <Services />
      <Prices />
      <Reviews />
      <Contacts />
      <Footer />
    </div>
  );
}