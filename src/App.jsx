import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import avatarsImg from './assets/avatars.jpg';
import topomapImg from './assets/topographical-map.svg';

gsap.registerPlugin(ScrollTrigger);

// Utility for merging tailwind classes
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// ----------------------------------------------------------------------------
// GLOBAL UI COMPONENTS
// ----------------------------------------------------------------------------

const MagneticButton = ({ children, className, variant = 'primary', href, ...props }) => {
    const baseClasses = "magnetic-btn px-8 py-4 text-base tracking-wide transition-colors group inline-flex items-center justify-center cursor-pointer";
    const variants = {
        primary: "bg-primary text-background hover:bg-primary/90",
        accent: "bg-accent text-white hover:bg-accent/90",
        outline: "border border-textDark/20 hover:border-textDark text-textDark bg-transparent"
    };

    const Element = href ? 'a' : 'button';

    return (
        <Element href={href} className={cn(baseClasses, variants[variant], className)} {...props}>
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
        </Element>
    );
};

// ----------------------------------------------------------------------------
// A. NAVBAR - "The Floating Island"
// ----------------------------------------------------------------------------

const NovaLogo = ({ className = "w-6 h-6 text-accent" }) => (
    <svg viewBox="0 0 100 100" className={cn("animate-[spin_20s_linear_infinite]", className)} fill="currentColor">
        {/* Core circle */}
        <path fillRule="evenodd" clipRule="evenodd" d="M50 72C62.1503 72 72 62.1503 72 50C72 37.8497 62.1503 28 50 28C37.8497 28 28 37.8497 28 50C28 62.1503 37.8497 72 50 72ZM50 63C57.1797 63 63 57.1797 63 50C63 42.8203 57.1797 37 50 37C42.8203 37 37 42.8203 37 50C37 57.1797 42.8203 63 50 63Z" />
        {/* Rays */}
        {[...Array(24)].map((_, i) => (
            <rect key={i} x="48.5" y="2" width="3" height="22" transform={`rotate(${i * 15} 50 50)`} />
        ))}
    </svg>
);

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={cn(
            "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full px-6 py-3 flex items-center justify-between gap-8 md:gap-16",
            isScrolled
                ? "bg-background/80 backdrop-blur-xl border border-primary/10 shadow-lg text-primary"
                : "bg-transparent text-background"
        )}>
            <div className="flex items-center gap-2">
                <NovaLogo className={cn("w-6 h-6", isScrolled ? "text-accent" : "text-background")} />
                <div className="font-heading font-bold text-xl tracking-tight">NovaReach</div>
            </div>
            <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium">
                <a href="#how" className="link-lift hover:text-accent transition-colors">How it Works</a>
                <a href="#features" className="link-lift hover:text-accent transition-colors">Features</a>
                <a href="#industries" className="link-lift hover:text-accent transition-colors">Industries</a>
            </div>
            <MagneticButton href="#booking" variant={isScrolled ? 'accent' : 'primary'} className="hidden sm:flex px-6 py-2.5 text-sm">
                Try Free Demo
            </MagneticButton>
        </nav>
    );
};

// ----------------------------------------------------------------------------
// B. HERO SECTION - "The Opening Shot"
// ----------------------------------------------------------------------------

const Hero = () => {
    const container = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo('.hero-elem',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.15 }
            );
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden pb-12 md:pb-24 pt-32 mt-0">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2800"
                    alt="Modern office space"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/30 backdrop-blur-sm" />
            </div>

            {/* Black Box on the inside */}
            <div className="relative z-10 w-full max-w-6xl mx-auto rounded-[3rem] bg-[#0A0A0A]/95 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 overflow-hidden border border-white/10 p-10 md:p-16 shadow-2xl mt-8">
                {/* Subtle topological map over the black box */}
                <div className="absolute inset-0 z-0 opacity-5" style={{ backgroundImage: `url(${topomapImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

                {/* Left Column - Original Copy */}
                <div className="flex-1 flex flex-col justify-center relative z-10">
                    <p className="hero-elem font-mono text-accent mb-6 uppercase tracking-widest text-sm font-bold">
                        Growth on autopilot with AI
                    </p>
                    <h1 className="flex flex-col gap-2 mb-6 text-white">
                        <span className="hero-elem font-heading font-bold text-5xl md:text-6xl tracking-tight leading-none">
                            Meet your reliable
                        </span>
                        <span className="hero-elem font-drama italic text-6xl md:text-[7rem] leading-[0.9] text-white/90 pr-4 md:pr-0">
                            AI Receptionist.
                        </span>
                    </h1>
                    <div className="hero-elem flex items-center gap-4 mb-8">
                        <div className="flex gap-2 p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 shadow-inner">
                            <Icon icon="pixelarticons:server" className="w-6 h-6 text-accent animate-pulse opacity-100 drop-shadow-md" />
                            <Icon icon="pixelarticons:git-commit" className="w-6 h-6 text-accent animate-pulse opacity-100 drop-shadow-md" style={{ animationDelay: "200ms" }} />
                            <Icon icon="pixelarticons:zap" className="w-6 h-6 text-accent animate-pulse opacity-100 drop-shadow-md" style={{ animationDelay: "400ms" }} />
                        </div>
                        <h2 className="font-heading text-xl md:text-2xl text-white/90 font-bold tracking-wide">
                            Powered by the Nova Protocol
                        </h2>
                    </div>
                    <p className="hero-elem font-sans text-lg md:text-xl text-white/60 max-w-xl mb-12 leading-relaxed font-light">
                        Your clients want fast answers. NovaReach responds instantly and turns every call or message into a booked appointment — 24/7.
                    </p>
                    <div className="hero-elem flex flex-wrap gap-4">
                        <MagneticButton href="#booking" variant="accent" className="px-8 py-3.5 text-background font-bold rounded-full">
                            Try Free Demo <Icon icon="pixelarticons:arrow-right" className="w-5 h-5 ml-1 inline" />
                        </MagneticButton>
                        <MagneticButton href="#booking" variant="outline" className="px-8 py-3.5 text-white border-white/30 hover:bg-white/10 font-bold rounded-full">
                            Talk to an Expert
                        </MagneticButton>
                    </div>
                </div>

                {/* Right Column - Agents & Lines */}
                <div className="flex-1 flex flex-col items-center justify-center relative w-full lg:w-auto z-10">
                    <div className="relative z-10 flex flex-col items-center w-full max-w-sm">

                        {/* Tabs */}
                        <div className="flex items-center gap-3 mb-10 hero-elem hidden sm:flex">
                            <div className="px-6 py-2 rounded-full border border-white/20 text-white/50 text-xs font-mono tracking-widest uppercase cursor-pointer hover:bg-white/5 transition-colors">Build</div>
                            <div className="px-6 py-2 rounded-full bg-accent text-background text-xs font-mono tracking-widest font-bold uppercase ring-4 ring-accent/20 cursor-pointer shadow-lg shadow-accent/20 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse"></span> Train
                            </div>
                            <div className="px-6 py-2 rounded-full border border-white/20 text-white/50 text-xs font-mono tracking-widest uppercase cursor-pointer hover:bg-white/5 transition-colors">Deploy</div>
                        </div>

                        {/* Connection Lines (Decorative) */}
                        <div className="w-[80%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-10 hero-elem relative">
                            <div className="absolute top-0 left-1/2 w-px h-8 bg-white/20 -translate-y-full -translate-x-1/2"></div>
                            <div className="absolute top-0 left-1/4 w-px h-8 bg-white/20 -translate-y-full -translate-x-1/2"></div>
                            <div className="absolute top-0 left-3/4 w-px h-8 bg-white/20 -translate-y-full -translate-x-1/2"></div>
                        </div>

                        {/* Agents in Hero */}
                        <div className="w-full flex flex-col gap-6 hero-elem">
                            <div className="bg-white/5 hover:bg-white/10 transition-colors rounded-3xl p-5 border border-white/10 backdrop-blur-sm cursor-pointer shadow-xl">
                                <PixelAgent
                                    name="Monica"
                                    role="Frontline Responder"
                                    description="Intercepts leads & answers FAQs instantly."
                                    bgX={100}
                                    bgY={0}
                                    delay=""
                                    theme="dark"
                                />
                            </div>
                            <div className="bg-white/5 hover:bg-white/10 transition-colors rounded-3xl p-5 border border-white/10 backdrop-blur-sm cursor-pointer shadow-xl">
                                <PixelAgent
                                    name="David"
                                    role="Booking Specialist"
                                    description="Politely loops clients to lock appointments."
                                    bgX={66.66}
                                    bgY={0}
                                    delay=""
                                    theme="dark"
                                />
                            </div>
                            <div className="bg-white/5 hover:bg-white/10 transition-colors rounded-3xl p-5 border border-white/10 backdrop-blur-sm cursor-pointer shadow-xl">
                                <PixelAgent
                                    name="Charlie"
                                    role="Retention Expert"
                                    description="Proactively checks in to resurrect dead leads."
                                    bgX={33.33}
                                    bgY={66.66}
                                    delay=""
                                    theme="dark"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

// ----------------------------------------------------------------------------
// C. FEATURES - "Interactive Functional Artifacts"
// ----------------------------------------------------------------------------

const PixelAgent = ({ name, role, description, bgX, bgY, delay, theme = "light" }) => {
    const isDark = theme === "dark";
    return (
        <div className="flex items-start gap-4 mb-4 group">
            <div className={cn(
                "w-14 h-14 rounded-lg border-2 border-primary/20 bg-background overflow-hidden flex-shrink-0 mt-0.5",
                "transition-transform duration-500 ease-in-out group-hover:-translate-y-1.5",
                delay
            )}>
                <div
                    className="w-full h-full transform transition-transform duration-300 group-hover:scale-110"
                    style={{
                        backgroundImage: `url(${avatarsImg})`,
                        backgroundSize: '400% 400%',
                        backgroundPosition: `${bgX}% ${bgY}%`,
                        imageRendering: 'pixelated'
                    }}
                />
            </div>
            <div>
                <p className={cn("font-mono text-[10px] uppercase tracking-widest mb-0.5", isDark ? "text-white/60" : "text-primary/60")}>{role}</p>
                <p className={cn("font-heading font-bold text-base mb-1", isDark ? "text-white" : "text-textDark")}>{name}</p>
                <p className={cn("font-sans text-xs leading-relaxed pr-2", isDark ? "text-white/70" : "text-textDark/70")}>{description}</p>
            </div>
        </div>
    );
};

const Features = () => {
    return (
        <section id="features" className="py-24 md:py-32 bg-background relative z-10 overflow-hidden">
            {/* Section-wide Topological Map Background Overlay */}
            <div className="absolute inset-0 z-0 opacity-10 mix-blend-multiply pointer-events-none" style={{ backgroundImage: `url(${topomapImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-6">
                        Make Sure Your AI Actually Brings You Clients — Not Headaches.
                    </h2>
                    <p className="font-sans text-lg text-textDark/70">
                        NovaReach provides three core systems to ensure your calendar stays full.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Card 1: Diagnostic Shuffler (Fast Responses) */}
                    <div className="bg-white rounded-4xl p-8 border border-primary/5 shadow-xl shadow-primary/5 flex flex-col min-h-[480px]">
                        <div className="mb-6 relative z-10">
                            <PixelAgent
                                name="Monica"
                                role="Frontline Responder"
                                description="She never sleeps, intercepting every inbound lead and answering FAQs instantly."
                                bgX={100}
                                bgY={0}
                                delay="animate-bounce"
                            />
                            <h3 className="font-heading font-bold text-xl text-primary mb-1 mt-4">Instant Response</h3>
                            <p className="font-sans text-textDark/60 text-xs">Respond to every inquiry within seconds, day or night.</p>
                        </div>
                        <div className="flex-1 bg-background rounded-3xl p-4 overflow-hidden border border-primary/10 flex flex-col gap-3 justify-center">
                            <div className="bg-white text-textDark p-4 rounded-2xl shadow-sm border border-primary/5 w-[95%] self-start relative transform transition-transform hover:scale-[1.02] cursor-default">
                                <p className="text-xs font-mono mb-1 text-textDark/40 font-semibold">Client • 10:42 AM</p>
                                <p className="text-sm border-l-2 border-textDark/10 pl-2">"Do you have anything for tomorrow afternoon?"</p>
                            </div>
                            <div className="bg-primary text-background p-4 rounded-2xl shadow-lg border border-primary/40 w-[95%] self-end relative transform transition-transform hover:scale-[1.02] cursor-default">
                                <p className="text-xs font-mono mb-1 text-background/60 font-semibold flex items-center justify-between">
                                    <span>NovaReach • 10:42 AM</span>
                                    <span className="text-accent text-[10px] bg-accent/10 px-1.5 py-0.5 rounded">0:01s</span>
                                </p>
                                <p className="text-sm">"Yes, we have availability at 3 PM tomorrow. Shall I book it?"</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Telemetry Typewriter (Booking Existing) */}
                    <div className="bg-white rounded-4xl p-8 border border-primary/5 shadow-xl shadow-primary/5 flex flex-col min-h-[480px]">
                        <div className="mb-6 relative z-10">
                            <PixelAgent
                                name="David"
                                role="Booking Specialist"
                                description="He analyzes client intent and politely loops them back to lock down appointments."
                                bgX={66.66}
                                bgY={0}
                                delay="animate-bounce"
                            />
                            <h3 className="font-heading font-bold text-xl text-primary mb-1 mt-4">Automated Booking</h3>
                            <p className="font-sans text-textDark/60 text-xs">Turn casual messages from existing clients into solid appointments.</p>
                        </div>
                        <div className="flex-1 bg-textDark rounded-3xl p-6 overflow-hidden relative flex flex-col border border-primary/20">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                                <span className="text-accent font-mono text-xs uppercase tracking-wider">Live Feed</span>
                            </div>
                            <div className="font-mono text-background/80 text-sm leading-relaxed">
                                &gt; MATCHING_CLIENT: "Sarah W."<br />
                                &gt; PREFERENCE: "Morning slots"<br />
                                &gt; AI_ACTION: Checking calendar...<br />
                                &gt; AI_ACTION: Proposing 9:00 AM Tue.<br />
                                &gt; STATUS: <span className="text-green-400">BOOKED</span><span className="inline-block w-2 h-4 bg-background/50 ml-1 animate-pulse"></span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Cursor Protocol Scheduler (Lost Clients) */}
                    <div className="bg-white rounded-4xl p-8 border border-primary/5 shadow-xl shadow-primary/5 flex flex-col min-h-[480px]">
                        <div className="mb-6 relative z-10">
                            <PixelAgent
                                name="Charlie"
                                role="Retention Expert"
                                description="He proactively checks in on old clients to systematically resurrect dead leads."
                                bgX={33.33}
                                bgY={66.66}
                                delay="animate-bounce"
                            />
                            <h3 className="font-heading font-bold text-xl text-primary mb-1 mt-4">Re-engage List</h3>
                            <p className="font-sans text-textDark/60 text-xs">Bring back lost clients sitting dormant in your database.</p>
                        </div>
                        <div className="flex-1 bg-background rounded-3xl p-4 overflow-hidden relative border border-primary/10 flex flex-col justify-center">
                            <div className="relative z-10 grid grid-cols-7 gap-1 mb-4 text-center text-xs font-mono text-textDark/40">
                                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                            </div>
                            <div className="relative z-10 grid grid-cols-7 gap-1">
                                {[...Array(14)].map((_, i) => (
                                    <div key={i} className={cn(
                                        "aspect-square rounded-md border text-xs flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 relative",
                                        i === 11
                                            ? "bg-accent/20 border-accent text-accent font-bold shadow-sm"
                                            : "bg-white border-primary/5 text-textDark/50 hover:bg-primary/5 hover:text-textDark/80"
                                    )}>
                                        {i === 11 ? (
                                            <>
                                                <span>✓</span>
                                                <div className="absolute top-[60%] left-[60%] transform -translate-x-1/4 -translate-y-1/4 z-20 pointer-events-none drop-shadow-md animate-bounce">
                                                    <Icon icon="pixelarticons:mouse" className="w-6 h-6 text-textDark drop-shadow" />
                                                </div>
                                            </>
                                        ) : (
                                            i + 10
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

// ----------------------------------------------------------------------------
// D. REVENUE CALCULATOR - "The Recovery Engine"
// ----------------------------------------------------------------------------

const RevenueCalculator = () => {
    const [missedCalls, setMissedCalls] = useState(15);
    const [avgValue, setAvgValue] = useState(500);
    const [closeRate, setCloseRate] = useState(20);

    // Math
    const recoveredClients = Math.round(missedCalls * (closeRate / 100));
    const recoveredRevenue = recoveredClients * avgValue;

    return (
        <section className="py-24 bg-primary text-background relative z-10">
            <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Copy */}
                <div>
                    <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6">
                        See How Much You’re Losing From Missed Calls
                    </h2>
                    <p className="font-sans text-background/70 text-lg mb-8">
                        Find out how much revenue your business is leaving on the table — and how NovaReach recovers it automatically.
                    </p>
                    <ul className="space-y-4 font-sans text-background/80">
                        <li className="flex items-center gap-3"><Icon icon="pixelarticons:check" className="text-accent w-5 h-5 animate-pulse" /> Instantly responds to every inquiry</li>
                        <li className="flex items-center gap-3"><Icon icon="pixelarticons:check" className="text-accent w-5 h-5 animate-pulse" /> Answers FAQs 24/7</li>
                        <li className="flex items-center gap-3"><Icon icon="pixelarticons:check" className="text-accent w-5 h-5 animate-pulse" /> Books appointments directly into your calendar</li>
                    </ul>
                </div>

                {/* Calculator UI */}
                <div className="bg-white text-textDark p-8 rounded-4xl shadow-2xl border border-primary/10">
                    <div className="space-y-8 mb-10">
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="font-heading font-medium text-sm">Missed Calls/Messages (per month)</label>
                                <span className="font-mono text-accent font-bold">{missedCalls}</span>
                            </div>
                            <input type="range" min="5" max="100" value={missedCalls} onChange={(e) => setMissedCalls(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="font-heading font-medium text-sm">Average Client Value ($)</label>
                                <span className="font-mono text-accent font-bold">${avgValue}</span>
                            </div>
                            <input type="range" min="50" max="5000" step="50" value={avgValue} onChange={(e) => setAvgValue(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="font-heading font-medium text-sm">Your Closing Rate (%)</label>
                                <span className="font-mono text-accent font-bold">{closeRate}%</span>
                            </div>
                            <input type="range" min="5" max="100" value={closeRate} onChange={(e) => setCloseRate(parseInt(e.target.value))} className="w-full accent-primary" />
                        </div>
                    </div>

                    <div className="bg-background rounded-3xl p-6 text-center border border-primary/5">
                        <p className="font-sans text-sm text-textDark/60 mb-2">Revenue Recovered by AI (Monthly)</p>
                        <p className="font-heading font-bold text-5xl text-primary">${recoveredRevenue.toLocaleString()}</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

// ----------------------------------------------------------------------------
// E. PHILOSOPHY - "The Manifesto"
// ----------------------------------------------------------------------------

const InstantBookingInfo = () => {
    return (
        <section className="bg-white py-24 md:py-32 relative z-10 border-t border-primary/10">
            {/* ABOUT SECTION (Image 1 top part) */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-32">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-textDark/40 mb-8 font-bold">| ABOUT NOVAREACH |</p>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end">
                    <div className="lg:col-span-8">
                        <h2 className="font-heading font-medium text-4xl md:text-5xl lg:text-7xl tracking-tight text-textDark leading-[1.05]">
                            At NovaReach, We Believe <span className="text-primary italic font-drama">Instant 24/7 Booking</span> Should Flow Not Slow You Down
                        </h2>
                    </div>
                    <div className="lg:col-span-4 pb-2 md:pb-4">
                        <p className="font-sans text-textDark/70 text-lg md:text-xl leading-relaxed font-light">
                            Our Mission Is Simple:<br />
                            Make AI Receptionists Accessible, Scalable, And Effortless.
                        </p>
                    </div>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-b border-textDark/10 divide-y md:divide-y-0 md:divide-x divide-textDark/10">
                    <div className="p-8 md:p-12">
                        <div className="font-sans text-5xl md:text-6xl text-textDark mb-4 tracking-tighter">10x</div>
                        <div className="font-sans font-medium text-sm md:text-base mb-2 text-textDark">Faster Booking</div>
                        <div className="text-textDark/50 text-sm font-light leading-relaxed">Secure appointments in minutes, not hours.</div>
                    </div>
                    <div className="p-8 md:p-12">
                        <div className="font-sans text-5xl md:text-6xl text-textDark mb-4 tracking-tighter">50+</div>
                        <div className="font-sans font-medium text-sm md:text-base mb-2 text-textDark">Integrations</div>
                        <div className="text-textDark/50 text-sm font-light leading-relaxed">Connects seamlessly with your existing calendar CRM.</div>
                    </div>
                    <div className="p-8 md:p-12">
                        <div className="font-sans text-5xl md:text-6xl text-textDark mb-4 tracking-tighter">99.9%</div>
                        <div className="font-sans font-medium text-sm md:text-base mb-2 text-textDark">Uptime</div>
                        <div className="text-textDark/50 text-sm font-light leading-relaxed">Reliable AI performance you can absolutely trust.</div>
                    </div>
                    <div className="p-8 md:p-12">
                        <div className="font-sans text-5xl md:text-6xl text-textDark mb-4 tracking-tighter">24/7</div>
                        <div className="font-sans font-medium text-sm md:text-base mb-2 text-textDark">Coverage</div>
                        <div className="text-textDark/50 text-sm font-light leading-relaxed">Always here to answer calls and texts instantly.</div>
                    </div>
                </div>
            </div>

            {/* FEATURES SECTION (Image 1 bottom part) */}
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center mb-20 max-w-4xl mx-auto">
                    <p className="font-sans text-xs uppercase tracking-[0.2em] text-textDark/40 mb-8 font-bold">| FEATURES |</p>
                    <h2 className="font-heading font-medium text-4xl md:text-5xl lg:text-6xl mb-6">
                        Powerful Features For<br />Smarter Workflows
                    </h2>
                    <p className="font-sans text-textDark/60 text-lg md:text-xl leading-relaxed font-light mx-auto max-w-2xl">
                        NovaReach Comes Packed With Powerful Automation Features Designed To Eliminate Repetitive Tasks, Simplify Operations, And Keep Your Business Moving Forward.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b lg:border-l lg:border-r border-textDark/10 divide-y md:divide-y-0 md:divide-x divide-textDark/10">

                    {/* Feature 1 */}
                    <div className="group flex flex-col h-full bg-white">
                        <div className="h-72 border-b border-textDark/10 flex items-center justify-center p-8 relative overflow-hidden">
                            {/* Illustration: Workflow */}
                            <div className="relative w-full h-full flex items-center justify-center -ml-8">

                                {/* Plus bubbles removed per user request */}

                                <div className="w-48 h-12 bg-primary border-2 border-primary rounded-sm shadow-[4px_4px_0_0_#1A2F25] flex items-center px-4 gap-3 absolute top-[25%] left-[20%] transition-transform group-hover:-translate-y-1">
                                    <div className="w-6 h-6 bg-white/10 rounded border border-white/20 flex items-center justify-center"><Icon icon="pixelarticons:headphone" className="w-4 h-4 text-white" /></div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold leading-none font-mono tracking-tight text-white">Inquiry received</span>
                                        <span className="text-[9px] text-white/70 leading-none mt-1">Status: Active</span>
                                    </div>
                                </div>

                                <div className="w-48 h-12 bg-background border-2 border-primary rounded-sm shadow-[4px_4px_0_0_#1A2F25] flex items-center px-4 gap-3 absolute top-[50%] left-[30%] transition-transform group-hover:-translate-y-1" style={{ transitionDelay: "100ms" }}>
                                    <div className="w-6 h-6 bg-primary/10 rounded border border-primary/20 flex items-center justify-center"><Icon icon="pixelarticons:server" className="w-4 h-4 text-primary" /></div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold leading-none font-mono tracking-tight text-primary">AI Processing</span>
                                        <span className="text-[9px] text-primary/70 leading-none mt-1">Checking calendar</span>
                                    </div>
                                </div>

                                <div className="w-48 h-12 bg-accent border-2 border-primary rounded-sm shadow-[4px_4px_0_0_#1A2F25] flex items-center px-4 gap-3 absolute top-[75%] left-[20%] transition-transform group-hover:-translate-y-1" style={{ transitionDelay: "200ms" }}>
                                    <div className="w-6 h-6 bg-white/10 rounded border border-white/20 flex items-center justify-center"><Icon icon="pixelarticons:calendar-check" className="w-4 h-4 text-white" /></div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold leading-none font-mono tracking-tight text-white">Booked</span>
                                        <span className="text-[9px] text-white/70 leading-none mt-1">Confirmed</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="p-10 md:p-12 flex-1 flex flex-col justify-start">
                            <h3 className="font-heading text-2xl font-medium mb-4 text-textDark">Task Automation</h3>
                            <p className="font-sans text-textDark/60 leading-relaxed font-light">
                                Automate Repetitive Tasks And Free Up Your Team's Time For Strategic Work.
                            </p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="group flex flex-col h-full bg-white">
                        <div className="h-72 border-b border-textDark/10 flex items-center justify-center p-8 relative overflow-hidden">
                            {/* Illustration: Integration Graph */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                {/* Lines */}
                                <div className="absolute w-full h-px bg-textDark/10"></div>
                                <div className="absolute w-px h-full bg-textDark/10"></div>
                                <div className="absolute w-[70%] h-px bg-textDark/10 rotate-45"></div>
                                <div className="absolute w-[70%] h-px bg-textDark/10 -rotate-45"></div>

                                {/* Center Node */}
                                <div className="w-14 h-14 bg-white border-2 border-primary rounded-md flex items-center justify-center z-10 shadow-[4px_4px_0_0_#1A2F25]">
                                    <Icon icon="pixelarticons:zap" className="w-8 h-8 text-textDark drop-shadow-sm" />
                                </div>

                                {/* Satellite Nodes */}
                                <div className="absolute top-8 left-1/4 w-8 h-8 bg-primary border border-primary rounded-sm flex items-center justify-center shadow-[2px_2px_0_0_#1A2F25] transition-transform group-hover:scale-110"><Icon icon="pixelarticons:mail" className="w-4 h-4 text-white" /></div>
                                <div className="absolute top-6 right-1/4 w-8 h-8 bg-accent border border-primary rounded-sm flex items-center justify-center shadow-[2px_2px_0_0_#1A2F25] transition-transform group-hover:scale-110" style={{ transitionDelay: '50ms' }}><Icon icon="pixelarticons:shield" className="w-4 h-4 text-white" /></div>
                                <div className="absolute bottom-8 right-1/4 w-8 h-8 bg-background border border-primary rounded-sm flex items-center justify-center shadow-[2px_2px_0_0_#1A2F25] transition-transform group-hover:scale-110" style={{ transitionDelay: '100ms' }}><Icon icon="pixelarticons:calendar" className="w-4 h-4 text-primary" /></div>
                                <div className="absolute bottom-8 left-1/4 w-8 h-8 bg-primary border border-primary rounded-sm flex items-center justify-center shadow-[2px_2px_0_0_#1A2F25] transition-transform group-hover:scale-110" style={{ transitionDelay: '150ms' }}><Icon icon="pixelarticons:device-phone" className="w-4 h-4 text-white" /></div>
                            </div>
                        </div>
                        <div className="p-10 md:p-12 flex-1 flex flex-col justify-start">
                            <h3 className="font-heading text-2xl font-medium mb-4 text-textDark">Integrations</h3>
                            <p className="font-sans text-textDark/60 leading-relaxed font-light">
                                Connect With Your Favorite Apps And Tools For A Frictionless Workflow.
                            </p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="group flex flex-col h-full bg-white">
                        <div className="h-72 border-b border-textDark/10 flex items-center justify-center p-8 pb-0 relative overflow-hidden items-end">
                            {/* Illustration: Bar Chart */}
                            <div className="w-full h-[80%] flex items-end justify-center gap-3 lg:gap-5 pb-8 relative z-10">

                                {/* Legend */}
                                <div className="absolute top-0 right-4 flex items-center gap-4">
                                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-primary"></div><span className="text-[8px] font-mono text-textDark/40">Calls</span></div>
                                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-background border border-primary/20"></div><span className="text-[8px] font-mono text-textDark/40">Booked</span></div>
                                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-accent border border-primary/20"></div><span className="text-[8px] font-mono text-textDark/40">Revenue</span></div>
                                </div>

                                {/* Bars sets */}
                                <div className="flex items-end gap-1 h-full">
                                    <div className="w-4 lg:w-6 h-[40%] bg-primary border-t border-r border-primary transition-all duration-500 group-hover:h-[45%]"></div>
                                    <div className="w-4 lg:w-6 h-[70%] bg-background border border-primary transition-all duration-500 group-hover:h-[80%]"></div>
                                    <div className="w-4 lg:w-6 h-[30%] bg-accent border border-primary transition-all duration-500 group-hover:h-[40%]"></div>
                                </div>
                                <div className="flex items-end gap-1 h-full">
                                    <div className="w-4 lg:w-6 h-[60%] bg-primary border-t border-r border-primary transition-all duration-500 group-hover:h-[65%]" style={{ transitionDelay: '50ms' }}></div>
                                    <div className="w-4 lg:w-6 h-[40%] bg-background border border-primary transition-all duration-500 group-hover:h-[50%]" style={{ transitionDelay: '50ms' }}></div>
                                    <div className="w-4 lg:w-6 h-[50%] bg-accent border border-primary transition-all duration-500 group-hover:h-[55%]" style={{ transitionDelay: '50ms' }}></div>
                                </div>
                                <div className="flex items-end gap-1 h-full">
                                    <div className="w-4 lg:w-6 h-[80%] bg-primary border-t border-r border-primary transition-all duration-500 group-hover:h-[90%]" style={{ transitionDelay: '100ms' }}></div>
                                    <div className="w-4 lg:w-6 h-[90%] bg-background border border-primary transition-all duration-500 group-hover:h-[95%]" style={{ transitionDelay: '100ms' }}></div>
                                    <div className="w-4 lg:w-6 h-[60%] bg-accent border border-primary transition-all duration-500 group-hover:h-[70%]" style={{ transitionDelay: '100ms' }}></div>
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-px bg-textDark/10"></div>
                        </div>
                        <div className="p-10 md:p-12 flex-1 flex flex-col justify-start">
                            <h3 className="font-heading text-2xl font-medium mb-4 text-textDark">Real-Time Insights</h3>
                            <p className="font-sans text-textDark/60 leading-relaxed font-light">
                                Track Progress, Performance, And Results With Intuitive Dashboards.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

// ... Continuing in next file update

// Removed Chatbot widget - user will embed a script from GHL or another host natively into <head> or <body> later.

// ----------------------------------------------------------------------------
// F. PROTOCOL - "Sticky Stacking Archive"
// ----------------------------------------------------------------------------

const HowItWorks = () => {
    return (
        <section id="how" className="bg-[#FAF9F6] py-32 border-t border-textDark/5">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <p className="font-sans text-xs uppercase tracking-[0.2em] text-textDark/40 mb-6 font-bold">| HOW IT WORKS |</p>
                    <h2 className="font-heading font-medium text-4xl md:text-5xl lg:text-5xl text-textDark mb-6 leading-[1.2]">
                        Done-For-You AI<br />Implementation
                    </h2>
                    <p className="font-sans text-textDark/50 text-base md:text-lg max-w-xl mx-auto">
                        We handle the entire setup process from start to finish. You sit back, and we build your automated booking engine.
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Step 1 */}
                    <div className="bg-white rounded border border-textDark/5 p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-start justify-between gap-8 group hover:shadow-md transition-shadow">
                        <div className="flex-1 md:pr-12">
                            <p className="font-sans text-xs font-bold text-textDark/40 mb-5 tracking-widest uppercase">| STEP 1 |</p>
                            <h3 className="font-heading text-2xl font-medium mb-6 text-textDark">We Map Your Workflow</h3>
                            <div className="w-full h-px bg-textDark/5 mb-6"></div>
                            <p className="font-sans text-textDark/50 leading-relaxed font-light">
                                We analyze your current processes and design a custom AI workflow tailored exactly to how your business operates.
                            </p>
                        </div>
                        <div className="w-16 h-16 rounded-md bg-primary border border-primary/20 flex flex-shrink-0 items-center justify-center -ml-2 group-hover:-translate-y-1 transition-transform">
                            <Icon icon="pixelarticons:sliders" className="w-6 h-6 text-background" />
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white rounded border border-textDark/5 p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-start justify-between gap-8 group hover:shadow-md transition-shadow">
                        <div className="flex-1 md:pr-12">
                            <p className="font-sans text-xs font-bold text-textDark/40 mb-5 tracking-widest uppercase">| STEP 2 |</p>
                            <h3 className="font-heading text-2xl font-medium mb-6 text-textDark">We Integrate Everything</h3>
                            <div className="w-full h-px bg-textDark/5 mb-6"></div>
                            <p className="font-sans text-textDark/50 leading-relaxed font-light">
                                We connect NovaReach directly to your existing CRM, calendar, and phone systems so everything stays perfectly in sync.
                            </p>
                        </div>
                        <div className="w-16 h-16 rounded-md bg-accent border border-primary/20 flex flex-shrink-0 items-center justify-center -ml-2 group-hover:-translate-y-1 transition-transform">
                            <Icon icon="pixelarticons:server" className="w-6 h-6 text-background" />
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white rounded border border-textDark/5 p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-start justify-between gap-8 group hover:shadow-md transition-shadow">
                        <div className="flex-1 md:pr-12">
                            <p className="font-sans text-xs font-bold text-textDark/40 mb-5 tracking-widest uppercase">| STEP 3 |</p>
                            <h3 className="font-heading text-2xl font-medium mb-6 text-textDark">We Deploy & Test</h3>
                            <div className="w-full h-px bg-textDark/5 mb-6"></div>
                            <p className="font-sans text-textDark/50 leading-relaxed font-light">
                                We launch your new AI receptionist and rigorously test it to ensure every client interaction is handled flawlessly.
                            </p>
                        </div>
                        <div className="w-16 h-16 rounded-md bg-background border border-primary/20 flex flex-shrink-0 items-center justify-center -ml-2 group-hover:-translate-y-1 transition-transform">
                            <Icon icon="pixelarticons:zap" className="w-6 h-6 text-primary" />
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="bg-white rounded border border-textDark/5 p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-start justify-between gap-8 group hover:shadow-md transition-shadow">
                        <div className="flex-1 md:pr-12">
                            <p className="font-sans text-xs font-bold text-textDark/40 mb-5 tracking-widest uppercase">| STEP 4 |</p>
                            <h3 className="font-heading text-2xl font-medium mb-6 text-textDark">We Maintain & Optimize</h3>
                            <div className="w-full h-px bg-textDark/5 mb-6"></div>
                            <p className="font-sans text-textDark/50 leading-relaxed font-light">
                                We continuously monitor your AI's performance, make expert adjustments, and ensure it always maximizes your booking rates.
                            </p>
                        </div>
                        <div className="w-16 h-16 rounded-md bg-primary border border-primary/20 flex flex-shrink-0 items-center justify-center -ml-2 group-hover:-translate-y-1 transition-transform">
                            <Icon icon="pixelarticons:chart-bar" className="w-6 h-6 text-background" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ----------------------------------------------------------------------------
// G. INDUSTRIES / PITCH (Replacing Pricing)
// ----------------------------------------------------------------------------

const Industries = () => {
    return (
        <section id="industries" className="py-32 bg-background relative z-20 rounded-t-[3rem] -mt-12 overflow-hidden border-t border-primary/10">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center mb-20">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-6">
                        Built for Local Service Businesses.
                    </h2>
                    <p className="font-sans text-lg text-textDark/70 max-w-2xl mx-auto">
                        Whether you are under a sink, on a roof, or with a client, NovaReach works in the background.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 max-w-5xl mx-auto w-full">
                    {[
                        { name: "Automotive", icon: "car", color: "bg-primary text-white border-primary" },
                        { name: "Beauty Salons", icon: "eye", color: "bg-accent text-white border-accent" },
                        { name: "Legal", icon: "briefcase", color: "bg-background text-primary border-primary/20" },
                        { name: "Roofing", icon: "home", color: "bg-primary text-white border-primary" },
                        { name: "Medical Clinics", icon: "heart", color: "bg-background text-primary border-primary/20" },
                        { name: "Property Mgmt", icon: "buildings", color: "bg-accent text-white border-accent" },
                        { name: "HVAC & Plumbing", icon: "drop", color: "bg-primary text-white border-primary" },
                        { name: "More Businesses", icon: "plus", color: "bg-white text-primary border-primary/20" }
                    ].map((ind, i) => (
                        <div key={i} className="group flex flex-col items-center justify-center p-6 bg-white border-2 border-primary rounded-xl shadow-[4px_4px_0_0_#1A2F25] transition-transform hover:-translate-y-1 cursor-pointer">
                            <div className={cn("w-12 h-12 rounded flex items-center justify-center mb-4 border", ind.color)}>
                                <Icon icon={`pixelarticons:${ind.icon}`} className="w-6 h-6" />
                            </div>
                            <span className="font-heading font-bold text-sm text-textDark text-center leading-tight">{ind.name}</span>
                        </div>
                    ))}
                </div>

                {/* Pitch CTA Block */}
                <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                    {/* Noise again slightly stronger here */}
                    <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.85%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noiseFilter)%22%2F%3E%3C%2Fsvg%3E')]"></div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="font-heading font-bold text-4xl md:text-5xl text-background mb-8">
                            Start using AI today.
                        </h2>
                        <p className="font-sans text-xl text-background/80 mb-12 font-light">
                            Reserve your free demo today and see how effortless growth becomes when your business runs on autopilot.
                        </p>
                        <MagneticButton href="#booking" variant="accent" className="text-lg px-12 py-5 shadow-2xl shadow-accent/20">
                            Book Live Demo
                        </MagneticButton>
                    </div>
                </div>
            </div >
        </section >
    );
}

// ----------------------------------------------------------------------------
// G.5 TESTIMONIALS (NEW)
// ----------------------------------------------------------------------------

const Testimonials = () => {
    return (
        <div className="px-2 md:px-6 w-full max-w-7xl mx-auto my-12 relative z-10">
            <section id="testimonials" className="pt-24 pb-12 md:pt-32 md:pb-24 bg-[#111111] rounded-[2.5rem] relative overflow-hidden shadow-2xl">
                <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
                    <div className="text-center mb-16 md:mb-24 flex flex-col items-center justify-center">
                        <h2 className="text-[#F9F6EE] font-heading font-medium text-5xl md:text-7xl leading-tight inline-flex flex-col items-center rotate-[-2deg]">
                            <span>Love letters</span>
                            <span className="flex items-center gap-4">
                                to <span className="font-drama italic text-accent pr-1">NovaReach</span>
                            </span>
                        </h2>
                    </div>

                    {/* Top Row - Testimonials Grid (Bottom Aligned) */}
                    <div className="flex flex-nowrap overflow-x-auto hide-scrollbar pb-6 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-4 gap-4 md:gap-4 items-end justify-start">

                        {/* Card 1 */}
                        <div className="flex-none w-[280px] md:w-auto bg-[#F9F6EE] rounded-[2rem] p-6 flex flex-col items-center text-center shadow-lg transform transition-transform md:hover:-translate-y-2 h-[280px]">
                            <img src="https://i.pravatar.cc/100?img=11" alt="Mark W." className="w-10 h-10 rounded-full mb-4 object-cover border border-[#111111]/10" />
                            <p className="font-sans text-[#111111]/80 text-[13px] mb-4 flex-1 leading-relaxed">
                                "I can make quick edits while speaking because NovaReach really understands me perfectly. It's accuracy and speed make it a real game changer."
                            </p>
                            <p className="font-sans text-[10px] text-[#111111]/60">Mark Williams, HVAC Owner</p>
                        </div>

                        {/* Card 2 */}
                        <div className="flex-none w-[280px] md:w-auto bg-[#F9F6EE] rounded-[2rem] p-6 flex flex-col items-center text-center shadow-lg transform transition-transform md:hover:-translate-y-2 h-[260px]">
                            <img src="https://i.pravatar.cc/100?img=47" alt="Sarah R." className="w-10 h-10 rounded-full mb-4 object-cover border border-[#111111]/10" />
                            <p className="font-sans text-[#111111]/80 text-[13px] mb-4 flex-1 leading-relaxed">
                                "I have Parkinson's, and this AI has just made my life so much easier. I can't even explain the change that it has provided for me."
                            </p>
                            <p className="font-sans text-[10px] text-[#111111]/60">Sarah R, Indirect Sourcing Manager</p>
                        </div>

                        {/* Card 3 */}
                        <div className="flex-none w-[280px] md:w-auto bg-[#F9F6EE] rounded-[2rem] p-6 flex flex-col items-center text-center shadow-lg transform transition-transform md:hover:-translate-y-2 h-[200px]">
                            <img src="https://i.pravatar.cc/100?img=68" alt="Alex M." className="w-10 h-10 rounded-full mb-4 object-cover border border-[#111111]/10" />
                            <p className="font-sans text-[#111111]/80 text-[13px] mb-4 flex-1 leading-relaxed">
                                "Hey! NovaReach is currently blowing my mind with how fast and useful it is!"
                            </p>
                            <p className="font-sans text-[10px] text-[#111111]/60">Alex M, ML Platforms at X</p>
                        </div>

                        {/* Card 4 */}
                        <div className="flex-none w-[280px] md:w-auto bg-[#F9F6EE] rounded-[2rem] p-6 flex flex-col items-center text-center shadow-lg transform transition-transform md:hover:-translate-y-2 h-[220px]">
                            <img src="https://i.pravatar.cc/100?img=60" alt="James D." className="w-10 h-10 rounded-full mb-4 object-cover border border-[#111111]/10" />
                            <p className="font-sans text-[#111111]/80 text-[13px] mb-4 flex-1 leading-relaxed">
                                "I was able to dictate ~70 appointments into my system. This is a massive time saver."
                            </p>
                            <p className="font-sans text-[10px] text-[#111111]/60">James D, CEO, Digits</p>
                        </div>
                    </div>

                    {/* Bottom Row - Larger Metric Cards */}
                    <div className="flex flex-col md:flex-row gap-4 mt-2">
                        {/* Metric Card 1 */}
                        <div className="flex-1 bg-[#054D3D] rounded-[2rem] p-8 md:p-10 relative overflow-hidden group">
                            <Icon icon="pixelarticons:arrow-up-right" className="absolute top-8 right-8 w-6 h-6 text-[#F9F6EE]/50 group-hover:text-[#F9F6EE] transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            <h3 className="font-heading text-[#F9F6EE] text-3xl md:text-3xl lg:text-4xl mb-3 font-medium tracking-wide">4x faster responses</h3>
                            <p className="font-sans text-[#F9F6EE]/80 text-[15px] mb-16">The "surprisingly fast" advisor.</p>

                            <div className="flex items-center gap-3">
                                <img src="https://i.pravatar.cc/100?img=33" alt="Gaurav V." className="w-8 h-8 rounded-full object-cover border-2 border-[#F9F6EE]/10" />
                                <div>
                                    <p className="font-sans text-[#F9F6EE] text-xs font-semibold">Gaurav Vohra</p>
                                    <p className="font-sans text-[#F9F6EE]/60 text-[10px]">Startup Advisor & Growth Leader</p>
                                </div>
                            </div>
                        </div>

                        {/* Metric Card 2 */}
                        <div className="flex-1 bg-[#054D3D] rounded-[2rem] p-8 md:p-10 relative overflow-hidden group">
                            <Icon icon="pixelarticons:arrow-up-right" className="absolute top-8 right-8 w-6 h-6 text-[#F9F6EE]/50 group-hover:text-[#F9F6EE] transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            <h3 className="font-heading text-[#F9F6EE] text-3xl md:text-3xl lg:text-4xl mb-3 font-medium tracking-wide">50+ hours saved</h3>
                            <p className="font-sans text-[#F9F6EE]/80 text-[15px] mb-16">Before NovaReach, writing was a battle. Now, it's a conversation.</p>

                            <div className="flex items-center gap-3">
                                <img src="https://i.pravatar.cc/100?img=12" alt="Greg D." className="w-8 h-8 rounded-full object-cover border-2 border-[#F9F6EE]/10" />
                                <div>
                                    <p className="font-sans text-[#F9F6EE] text-xs font-semibold">Greg Dickson</p>
                                    <p className="font-sans text-[#F9F6EE]/60 text-[10px]">Author</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

// ----------------------------------------------------------------------------
// H. FOOTER
// ----------------------------------------------------------------------------

const Footer = () => {
    return (
        <footer className="bg-textDark pt-24 pb-8 rounded-t-[4rem] px-6 md:px-12 mt-20 relative z-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                        <NovaLogo className="w-8 h-8 text-accent" />
                        <h3 className="font-heading font-bold text-2xl text-background">NovaReach</h3>
                    </div>
                    <p className="font-sans text-background/60 max-w-sm mb-8 leading-relaxed font-light">
                        Growth on autopilot with AI. Turn every call and message into a booked appointment seamlessly.
                    </p>
                    <div className="inline-flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="font-mono text-xs text-background/80 uppercase tracking-widest">System Operational</span>
                    </div>
                </div>

                <div>
                    <h4 className="font-sans font-bold text-background mb-4 text-sm tracking-wider uppercase opacity-50">Platform</h4>
                    <ul className="space-y-3 font-sans text-background/70 text-sm">
                        <li><a href="#how" className="hover:text-accent transition-colors">How it Works</a></li>
                        <li><a href="#features" className="hover:text-accent transition-colors">Features</a></li>
                        <li><a href="#industries" className="hover:text-accent transition-colors">Industries</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-sans font-bold text-background mb-4 text-sm tracking-wider uppercase opacity-50">Contact</h4>
                    <ul className="space-y-3 font-sans text-background/70 text-sm">
                        <li>philipp@getnovareach.com</li>
                        <li>+1 249-421-7705</li>
                        <li className="leading-relaxed">530 Rue Saint-Hubert<br />Montréal, QC H2Y 0B9, Canada</li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-background/40">
                <p>© 2026 Udaloy Trading Inc. (dba NovaReach). All Rights Reserved.</p>
                <div className="flex gap-6">
                    <a href="#/terms" className="hover:text-background transition-colors">Terms & Conditions</a>
                    <a href="#/privacy" className="hover:text-background transition-colors">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
}

// ----------------------------------------------------------------------------
// I. FAQ SECTION (NEW)
// ----------------------------------------------------------------------------
const faqs = [
    {
        icon: "gift",
        question: "Is there a free trial or demo available?",
        answer: "Yes, we offer a free live demo where we analyze your current setup and show you exactly how NovaReach will integrate into your business. We'll provide you with a free onboarding session to get you set up."
    },
    {
        icon: "clock",
        question: "How long does setup take?",
        answer: "Usually, we map your workflow and deploy the AI within 48 to 72 hours. You won't have to lift a finger—it's a complete done-for-you service."
    },
    {
        icon: "calendar",
        question: "Can it book directly into my calendar?",
        answer: "Absolutely. NovaReach integrates natively with Google Calendar, Outlook, and most major CRM scheduling tools to secure appointments in real-time."
    },
    {
        icon: "message",
        question: "What happens if the AI doesn't know the answer?",
        answer: "If the AI encounters a question outside its custom knowledge base, it gracefully escalates the conversation by looping in a designated human staff member so they can take over."
    },
    {
        icon: "shield",
        question: "Are my interactions and data kept secure?",
        answer: "Data security is our top priority. We use enterprise-grade encryption and do not train public models on your private customer conversations."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="py-24 bg-background relative z-10 font-sans border-t border-primary/10">
            <div className="max-w-3xl mx-auto px-6 md:px-12">

                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-heading font-medium text-textDark mb-5">Frequently asked questions</h2>
                    <p className="text-textDark/60 text-lg">
                        These are the most commonly asked questions about NovaReach.<br className="hidden md:block" />
                        Can't find what you're looking for? <a href="#contact" className="underline hover:text-primary font-medium transition-colors">Chat to our friendly team!</a>
                    </p>
                </div>

                <div className="flex justify-center mb-12">
                    <div className="flex items-center gap-3">
                        <button className="px-6 py-2.5 rounded-full bg-textDark text-background font-medium text-sm shadow-md transition-transform hover:scale-105">General</button>
                    </div>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="bg-white border border-textDark/10 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                                className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 focus:outline-none cursor-pointer group"
                            >
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="w-10 h-10 rounded-[12px] bg-[#EDE8E0] border border-[#d3cdc4]/30 flex-shrink-0 overflow-hidden flex items-center justify-center -mt-0.5 transition-transform duration-300 group-hover:bg-[#e4ddd4]">
                                        <Icon icon={`pixelarticons:${faq.icon}`} className="w-5 h-5 text-textDark/60 transition-transform duration-300 group-hover:scale-110 group-hover:text-textDark/80" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={cn("font-medium text-[17px] transition-colors", openIndex === idx ? "text-textDark" : "text-textDark/80")}>
                                            {faq.question}
                                        </h3>
                                        <div
                                            className={cn(
                                                "grid transition-all duration-300",
                                                openIndex === idx ? "grid-rows-[1fr] mt-3 opacity-100" : "grid-rows-[0fr] opacity-0"
                                            )}
                                        >
                                            <div className="overflow-hidden">
                                                <p className="text-textDark/60 leading-relaxed text-[15px] pr-4 pb-2">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-textDark/40 flex-shrink-0 mt-2">
                                    <Icon
                                        icon={openIndex === idx ? "pixelarticons:chevron-up" : "pixelarticons:chevron-down"}
                                        className="w-5 h-5 transition-transform duration-300"
                                    />
                                </div>
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

// ----------------------------------------------------------------------------
// J. BOOKING SECTION
// ----------------------------------------------------------------------------
const Booking = () => {
    return (
        <section id="booking" className="py-24 bg-background relative z-10 font-sans border-t border-primary/10">
            <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-heading font-medium text-textDark mb-5">
                        Ready to automate your growth?
                    </h2>
                    <p className="text-textDark/60 text-lg max-w-2xl mx-auto">
                        Book a free 30-minute onboarding call below. We'll analyze your current workflow and show you exactly how NovaReach integrates seamlessly into your business.
                    </p>
                </div>

                {/* Embedded GoHighLevel Calendar */}
                <div className="w-full relative bg-transparent rounded-3xl overflow-hidden">
                    <iframe
                        src="https://link.getnovareach.com/widget/booking/qFRTVGZv9LgH5ic3teRC"
                        style={{ width: "100%", border: "none", overflow: "hidden", height: "1150px" }}
                        scrolling="no"
                        id="qFRTVGZv9LgH5ic3teRC_1775851920443"
                    />
                </div>
            </div>
        </section>
    );
};

// ----------------------------------------------------------------------------
// K. CALCULATOR TEASER SECTION
// ----------------------------------------------------------------------------

const CalculatorTeaser = () => {
    const ref = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.ct-stat',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, stagger: 0.15, duration: 0.8,
                    scrollTrigger: { trigger: ref.current, start: 'top 70%' }
                }
            );
            gsap.fromTo('.ct-copy',
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0, duration: 0.8,
                    scrollTrigger: { trigger: ref.current, start: 'top 65%' }
                }
            );
        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={ref} className="py-20 relative z-10" style={{ background: '#0A0A0A' }}>
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-24 mb-14">
                    {[
                        { stat: '8–15%', label: 'Industry Reactivation Rate' },
                        { stat: '$12,750', label: 'Avg. Recoverable Revenue' },
                        { stat: '43x', label: 'Typical Monthly ROI' },
                    ].map(({ stat, label }) => (
                        <div key={label} className="ct-stat text-center">
                            <div style={{ fontFamily: '"Space Mono", monospace', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#D36B42', lineHeight: 1 }}>{stat}</div>
                            <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '11px', letterSpacing: '0.15em', color: 'rgba(242,235,229,0.45)', textTransform: 'uppercase', marginTop: '8px' }}>{label}</div>
                        </div>
                    ))}
                </div>
                <div className="ct-copy text-center">
                    <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '10px', letterSpacing: '0.18em', color: '#D36B42', textTransform: 'uppercase', marginBottom: '14px' }}>
                        NovaReach — Re-Ignite System
                    </p>
                    <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontWeight: 700, color: '#F2EBE5', marginBottom: '12px', letterSpacing: '-0.5px', lineHeight: 1.15 }}>
                        Your past customers are worth more than you think.
                    </h2>
                    <p style={{ fontSize: '16px', color: 'rgba(242,235,229,0.55)', maxWidth: '480px', margin: '0 auto 32px', lineHeight: 1.65 }}>
                        See exactly how much revenue is sitting dormant in your existing customer list.
                    </p>
                    <a
                        href="#/calculator"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#D36B42', color: '#fff', fontWeight: 700, fontSize: '15px', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', transition: 'background 0.2s, transform 0.15s', fontFamily: '"Space Grotesk", sans-serif' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#E8956E'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#D36B42'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                        Calculate My Revenue →
                    </a>
                </div>
            </div>
        </section>
    );
};

// ----------------------------------------------------------------------------
// MAIN APP COMPONENT
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// LEGAL PAGES
// ----------------------------------------------------------------------------

const LegalPage = ({ children }) => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    return (
        <div className="bg-background min-h-screen selection:bg-accent selection:text-white">
            <Navbar />
            <main className="max-w-3xl mx-auto px-6 pt-36 pb-24">
                <a href="#" className="inline-flex items-center gap-2 font-sans text-sm text-textDark/50 hover:text-accent transition-colors mb-10">
                    ← Back to Home
                </a>
                {children}
            </main>
            <Footer />
        </div>
    );
};

const SectionTitle = ({ children }) => (
    <h2 className="font-heading font-bold text-xl text-primary mt-10 mb-3">{children}</h2>
);

const PrivacyPolicyPage = () => (
    <LegalPage>
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-3">Legal</p>
        <h1 className="font-heading font-bold text-4xl text-textDark mb-2">Privacy Policy</h1>
        <p className="font-sans text-sm text-textDark/40 mb-10">Effective date: March 18, 2026 &nbsp;·&nbsp; Last updated: March 18, 2026</p>

        <p className="font-sans text-textDark/80 leading-relaxed">
            <strong>Udaloy Trading Inc.</strong> (operating as <strong>NovaReach</strong>, "we," "us," or "our") is committed to protecting your personal information. This Privacy Policy describes how we collect, use, and disclose information when you visit <strong>getnovareach.com</strong> (the "Site") or engage our services.
        </p>

        <SectionTitle>1. Who We Are</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed">
            Udaloy Trading Inc. (dba NovaReach)<br />
            530 Rue Saint-Hubert<br />
            Montréal, QC H2Y 0B9, Canada<br /><br />
            Email: <a href="mailto:philipp@getnovareach.com" className="text-accent hover:underline">philipp@getnovareach.com</a><br />
            Phone: +1 249-421-7705
        </p>

        <SectionTitle>2. Information We Collect</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed mb-3"><strong>a) Information you provide directly</strong></p>
        <ul className="list-disc list-inside font-sans text-textDark/80 leading-relaxed space-y-1 mb-4">
            <li><strong>Name</strong> — when you submit our contact or inquiry form</li>
            <li><strong>Email address</strong> — when you submit our contact or inquiry form</li>
            <li><strong>Phone number</strong> — when you submit our form or opt in to SMS communications</li>
        </ul>
        <p className="font-sans text-textDark/80 leading-relaxed mb-3"><strong>b) Payment information</strong></p>
        <p className="font-sans text-textDark/80 leading-relaxed mb-4">
            Payments are processed through <strong>GoHighLevel</strong> and/or <strong>Stripe</strong>. We do not store your full credit card details on our servers. These processors handle all payment data securely under their own privacy policies.
        </p>
        <p className="font-sans text-textDark/80 leading-relaxed mb-3"><strong>c) Usage and analytics data</strong></p>
        <p className="font-sans text-textDark/80 leading-relaxed">
            We use <strong>Vercel Analytics</strong> and <strong>Vercel Speed Insights</strong> to collect anonymised data about Site usage (pages visited, referral sources, device/browser type). This data does not personally identify you.
        </p>

        <SectionTitle>3. How We Use Your Information</SectionTitle>
        <ul className="list-disc list-inside font-sans text-textDark/80 leading-relaxed space-y-1">
            <li>Respond to inquiries and fulfil service requests</li>
            <li>Send SMS and email communications related to appointment booking and outreach (where you have opted in or we have a legitimate business reason)</li>
            <li>Process payments for services rendered</li>
            <li>Improve our Site and services through aggregated analytics</li>
            <li>Comply with applicable legal obligations</li>
        </ul>

        <SectionTitle>4. SMS Communications</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed mb-3">
            By providing your phone number and checking the SMS consent box on our opt-in form at <strong>getnovareach.com</strong>, you consent to receive recurring automated SMS text messages from NovaReach (Udaloy Trading Inc.) regarding appointment scheduling, follow-up communications, promotional offers, and service information. Message frequency varies. Message and data rates may apply. You may opt out at any time by replying <strong>STOP</strong> to any message we send. Reply <strong>HELP</strong> for assistance.
        </p>
        <p className="font-sans text-textDark/80 leading-relaxed">
            <strong>No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.</strong> Mobile opt-in data and SMS consent information will never be sold, rented, or traded to any third party.
        </p>

        <SectionTitle>5. Disclosure of Your Information</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed mb-3">
            We do <strong>not</strong> sell, rent, or trade your personal information to third parties. <strong>Mobile opt-in data and SMS consent information will never be shared with third parties or affiliates for marketing or promotional purposes.</strong>
        </p>
        <p className="font-sans text-textDark/80 leading-relaxed">
            We may share your information only with:
        </p>
        <ul className="list-disc list-inside font-sans text-textDark/80 leading-relaxed space-y-1 mt-2">
            <li><strong>Service providers</strong> who assist us in operating our business (e.g., Stripe, GoHighLevel for payment processing and CRM) — these providers are contractually bound to handle your information confidentially and only for specified purposes</li>
            <li><strong>Legal authorities</strong> if required by law, regulation, or valid court order</li>
        </ul>

        <SectionTitle>6. Data Retention</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed">
            We retain your personal information for as long as necessary to fulfil the purposes outlined in this Policy, maintain our business records, and comply with legal obligations. Payment records are retained as required by applicable law.
        </p>

        <SectionTitle>7. Your Privacy Rights (PIPEDA)</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed mb-3">
            As a Canadian resident, you have rights under the <strong>Personal Information Protection and Electronic Documents Act (PIPEDA)</strong>, including the right to:
        </p>
        <ul className="list-disc list-inside font-sans text-textDark/80 leading-relaxed space-y-1">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate or incomplete information</li>
            <li>Withdraw consent to our use of your personal information (subject to legal or contractual restrictions)</li>
        </ul>
        <p className="font-sans text-textDark/80 leading-relaxed mt-3">
            To exercise these rights, contact us at <a href="mailto:philipp@getnovareach.com" className="text-accent hover:underline">philipp@getnovareach.com</a>.
        </p>

        <SectionTitle>8. Analytics &amp; Cookies</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed">
            Our Site does not use advertising or tracking cookies. Vercel Analytics uses a privacy-preserving approach that does not rely on cookies or persistent fingerprinting.
        </p>

        <SectionTitle>9. Third-Party Links</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed">
            Our Site may contain links to third-party websites. We are not responsible for the privacy practices of those websites and encourage you to review their respective privacy policies.
        </p>

        <SectionTitle>10. Security</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed">
            We take reasonable administrative and technical measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.
        </p>

        <SectionTitle>11. Changes to This Policy</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed">
            We may update this Privacy Policy from time to time. The updated policy will be posted on our Site with a revised effective date. We encourage you to review it periodically.
        </p>

        <SectionTitle>12. Contact Us</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed">
            Udaloy Trading Inc. (dba NovaReach)<br />
            530 Rue Saint-Hubert<br />
            Montréal, QC H2Y 0B9, Canada<br /><br />
            Email: <a href="mailto:philipp@getnovareach.com" className="text-accent hover:underline">philipp@getnovareach.com</a><br />
            Phone: +1 249-421-7705
        </p>
    </LegalPage>
);

const TermsPage = () => (
    <LegalPage>
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-3">Legal</p>
        <h1 className="font-heading font-bold text-4xl text-textDark mb-2">Terms &amp; Conditions</h1>
        <p className="font-sans text-sm text-textDark/40 mb-10">Effective date: March 18, 2026</p>

        <p className="font-sans text-textDark/80 leading-relaxed">
            These Terms and Conditions ("Terms") govern your access to and use of the NovaReach website (<strong>getnovareach.com</strong>) and any services provided by <strong>Udaloy Trading Inc.</strong> (operating as <strong>NovaReach</strong>, "we," "us," "our"). By accessing our Site or engaging our Services, you agree to be bound by these Terms.
        </p>

        <SectionTitle>1. About Us</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed">
            Udaloy Trading Inc. (dba NovaReach)<br />
            530 Rue Saint-Hubert<br />
            Montréal, QC H2Y 0B9, Canada<br /><br />
            Email: <a href="mailto:philipp@getnovareach.com" className="text-accent hover:underline">philipp@getnovareach.com</a>
        </p>

        <SectionTitle>2. Services</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed">
            NovaReach provides AI-powered lead outreach, follow-up automation, and appointment booking services (the "Services"). The specific scope, pricing, and deliverables for any engagement will be set out in a separate service agreement or written proposal.
        </p>

        <SectionTitle>3. Payment Terms</SectionTitle>
        <ul className="list-disc list-inside font-sans text-textDark/80 leading-relaxed space-y-1">
            <li>Payments are processed through <strong>GoHighLevel</strong> and/or <strong>Stripe</strong></li>
            <li>All fees are as agreed in your service agreement or invoice</li>
            <li>Payments are due by the date specified in your invoice</li>
            <li>All amounts are in Canadian dollars (CAD) unless otherwise stated in writing</li>
            <li>Fees are non-refundable unless otherwise agreed in writing prior to payment</li>
        </ul>

        <SectionTitle>4. No Guarantee of Results</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed">
            We make no representations or warranties that the Services will generate a specific number of leads, appointments, or revenue. Outcomes depend on many factors outside our control, including market conditions, your industry, competition, and the quality of your offer.
        </p>

        <SectionTitle>5. Intellectual Property</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed">
            All content on this Site — including text, graphics, logos, software, and branding — is the property of Udaloy Trading Inc. and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our prior written consent.
        </p>

        <SectionTitle>6. SMS Messaging Program</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed mb-3">
            NovaReach operates an SMS messaging program to communicate with leads and clients regarding appointment scheduling, follow-up, service updates, and promotional offers. By opting in, you agree to receive recurring automated text messages from NovaReach at the mobile number provided.
        </p>
        <ul className="list-disc list-inside font-sans text-textDark/80 leading-relaxed space-y-1">
            <li><strong>Message frequency varies</strong> based on your interactions and preferences</li>
            <li><strong>Message and data rates may apply.</strong> Check with your mobile carrier for details</li>
            <li><strong>To opt out</strong>, reply <strong>STOP</strong> to any message at any time. You will receive a confirmation and no further messages will be sent</li>
            <li><strong>For help</strong>, reply <strong>HELP</strong> or contact us at <a href="mailto:philipp@getnovareach.com" className="text-accent hover:underline">philipp@getnovareach.com</a></li>
            <li>Carriers are not liable for delayed or undelivered messages</li>
            <li>You must be <strong>18 years of age or older</strong> to opt in to SMS communications from NovaReach</li>
        </ul>

        <SectionTitle>7. Acceptable Use</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed mb-2">You agree not to:</p>
        <ul className="list-disc list-inside font-sans text-textDark/80 leading-relaxed space-y-1">
            <li>Use our Site or Services for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to our systems or data</li>
            <li>Interfere with or disrupt the integrity or performance of our Services</li>
            <li>Engage in any conduct that could harm or damage our reputation</li>
        </ul>

        <SectionTitle>8. Limitation of Liability</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed mb-3">
            To the fullest extent permitted by applicable law, Udaloy Trading Inc. and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of profits, revenue, data, or goodwill — arising out of or in connection with your use of the Site or Services, even if we have been advised of the possibility of such damages.
        </p>
        <p className="font-sans text-textDark/80 leading-relaxed">
            Our total aggregate liability to you for any claim arising out of or relating to these Terms or the Services shall not exceed the total fees paid by you to us in the three (3) months immediately preceding the event giving rise to the claim.
        </p>

        <SectionTitle>9. Indemnification</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed">
            You agree to indemnify, defend, and hold harmless Udaloy Trading Inc. and its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, costs, and expenses (including reasonable legal fees) arising out of or in any way connected with your use of the Services or your breach of these Terms.
        </p>

        <SectionTitle>10. Governing Law &amp; Jurisdiction</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed">
            These Terms are governed by and construed in accordance with the laws of the Province of <strong>Prince Edward Island</strong> and the federal laws of <strong>Canada</strong> applicable therein. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Prince Edward Island, Canada.
        </p>

        <SectionTitle>11. Changes to These Terms</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed">
            We reserve the right to modify these Terms at any time. The updated Terms will be posted on this page with a revised effective date. Your continued use of the Site or Services following any changes constitutes your acceptance of the revised Terms.
        </p>

        <SectionTitle>12. Severability</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed">
            If any provision of these Terms is held to be invalid or unenforceable, that provision shall be modified to the minimum extent necessary, and the remaining provisions shall continue in full force and effect.
        </p>

        <SectionTitle>13. Entire Agreement</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed">
            These Terms, together with any service agreement or written proposal provided to you, constitute the entire agreement between you and Udaloy Trading Inc. with respect to their subject matter and supersede all prior agreements and understandings.
        </p>

        <SectionTitle>14. Contact</SectionTitle>
        <p className="font-sans text-textDark/80 leading-relaxed">
            Udaloy Trading Inc. (dba NovaReach)<br />
            530 Rue Saint-Hubert<br />
            Montréal, QC H2Y 0B9, Canada<br /><br />
            Email: <a href="mailto:philipp@getnovareach.com" className="text-accent hover:underline">philipp@getnovareach.com</a><br />
            Phone: +1 249-421-7705
        </p>
    </LegalPage>
);

// ----------------------------------------------------------------------------
// MAIN PAGE
// ----------------------------------------------------------------------------

function App() {
    useEffect(() => {
        // Strip padding/margin from GoHighLevel wrappers
        let parent = document.getElementById('root')?.parentElement;
        while (parent && parent.tagName !== 'BODY') {
            parent.style.setProperty('padding', '0', 'important');
            parent.style.setProperty('margin', '0', 'important');
            parent.style.setProperty('max-width', '100%', 'important');
            parent.style.setProperty('width', '100vw', 'important');
            parent.style.setProperty('overflow-x', 'visible', 'important');
            parent = parent.parentElement;
        }
        document.body.style.setProperty('padding', '0', 'important');
        document.body.style.setProperty('margin', '0', 'important');
    }, []);

    return (
        <div className="relative bg-background min-h-screen selection:bg-accent selection:text-white">
            <Navbar />
            <Hero />
            <Features />
            <RevenueCalculator />
            <CalculatorTeaser />
            <InstantBookingInfo />
            <HowItWorks />
            <Industries />
            <Booking />
            <FAQ />
            <Footer />
        </div>
    );
}


// ----------------------------------------------------------------------------
// CALCULATOR PAGE (Re-Ignite Landing Page)
// ----------------------------------------------------------------------------

const REIGNITE_STYLES = `
.ri *,.ri *::before,.ri *::after{box-sizing:border-box;margin:0;padding:0;}
.ri{--green:#1A2F25;--orange:#D36B42;--cream:#F2EBE5;--charcoal:#1A1C1A;--dark:#0A0A0A;--orange-light:#E8956E;background:var(--dark);color:var(--cream);font-family:Inter,sans-serif;overflow-x:hidden;min-height:100dvh;}
.ri::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:0.03;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}
.ri-nav{position:fixed;top:0;left:0;width:100%;z-index:1000;background:rgba(10,10,10,0.9);backdrop-filter:blur(14px);border-bottom:1px solid rgba(211,107,66,0.15);padding:0 56px;height:62px;display:flex;align-items:center;justify-content:space-between;}
.ri .nav-logo{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:18px;color:var(--cream);letter-spacing:-0.5px;text-decoration:none;}
.ri .nav-logo span{color:var(--orange);}
.ri .nav-links{display:flex;gap:32px;align-items:center;}
.ri .nav-links a{font-family:'Space Mono',monospace;font-size:11px;letter-spacing:0.12em;color:rgba(242,235,229,0.45);text-decoration:none;transition:color 0.2s;}
.ri .nav-links a:hover{color:var(--cream);}
.ri .nav-cta{background:var(--orange);color:#fff !important;font-family:'Space Mono',monospace;font-size:11px;letter-spacing:0.1em;padding:9px 22px;border-radius:6px;text-decoration:none;transition:background 0.2s;}
.ri .nav-cta:hover{background:var(--orange-light) !important;}
.ri-hero{min-height:100vh;display:flex;align-items:center;padding:120px 80px 100px;position:relative;overflow:hidden;}
.ri .hero-glow{position:absolute;top:-100px;right:-200px;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(211,107,66,0.07) 0%,transparent 68%);pointer-events:none;}
.ri .hero-glow2{position:absolute;bottom:-200px;left:-200px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(26,47,37,0.5) 0%,transparent 70%);pointer-events:none;}
.ri .hero-inner{max-width:1080px;margin:0 auto;width:100%;display:grid;grid-template-columns:1fr 400px;gap:80px;align-items:center;}
.ri .hero-kicker{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:0.2em;color:var(--orange);display:flex;align-items:center;gap:10px;margin-bottom:22px;}
.ri .hero-kicker::before{content:'';width:28px;height:1px;background:var(--orange);}
.ri .hero-h1{font-family:'Space Grotesk',sans-serif;font-size:62px;font-weight:700;line-height:1.02;letter-spacing:-2px;color:var(--cream);margin-bottom:20px;}
.ri .hero-h1 em{font-family:'Cormorant Garamond',serif;font-style:italic;color:var(--orange);font-weight:400;font-size:70px;}
.ri .hero-sub{font-family:Inter,sans-serif;font-size:17px;line-height:1.7;color:rgba(242,235,229,0.55);max-width:500px;margin-bottom:40px;}
.ri .hero-sub strong{color:var(--cream);}
.ri .hero-actions{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:36px;}
.ri .btn-primary{background:var(--orange);color:#fff;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;border:none;cursor:pointer;transition:all 0.2s;display:inline-flex;align-items:center;gap:8px;}
.ri .btn-primary:hover{background:var(--orange-light);transform:translateY(-1px);}
.ri .btn-ghost{background:transparent;color:rgba(242,235,229,0.6);font-family:'Space Grotesk',sans-serif;font-weight:500;font-size:15px;padding:14px 24px;border-radius:8px;text-decoration:none;cursor:pointer;transition:color 0.2s;display:inline-flex;align-items:center;gap:6px;}
.ri .btn-ghost:hover{color:var(--cream);}
.ri .hero-trust{display:flex;gap:20px;flex-wrap:wrap;}
.ri .trust-item{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:0.12em;color:rgba(242,235,229,0.28);display:flex;align-items:center;gap:6px;}
.ri .trust-dot{width:3px;height:3px;border-radius:50%;background:var(--orange);opacity:0.5;}
.ri .hero-card{background:rgba(26,47,37,0.45);border:1px solid rgba(211,107,66,0.2);border-radius:20px;padding:32px;backdrop-filter:blur(10px);}
.ri .hero-card-label{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:0.18em;color:rgba(211,107,66,0.7);margin-bottom:24px;}
.ri .stat-row{display:flex;flex-direction:column;gap:12px;}
.ri .stat-item{display:flex;align-items:center;gap:16px;padding:14px 16px;background:rgba(242,235,229,0.04);border-radius:10px;border:1px solid rgba(242,235,229,0.05);}
.ri .stat-num{font-family:'Space Mono',monospace;font-size:26px;font-weight:700;color:var(--orange);flex-shrink:0;min-width:68px;}
.ri .stat-desc{font-family:Inter,sans-serif;font-size:12px;line-height:1.5;color:rgba(242,235,229,0.55);}
.ri .stat-desc strong{color:var(--cream);display:block;font-size:13px;}
.ri .hero-divider{height:1px;background:rgba(242,235,229,0.06);margin:20px 0;}
.ri .hero-afford{text-align:center;font-family:Inter,sans-serif;font-size:13px;color:rgba(242,235,229,0.45);line-height:1.6;}
.ri .hero-afford strong{color:var(--orange);font-family:'Space Mono',monospace;font-size:12px;display:block;margin-bottom:4px;}
.ri .stats-bar{background:var(--green);border-top:1px solid rgba(211,107,66,0.15);border-bottom:1px solid rgba(211,107,66,0.15);padding:44px 80px;}
.ri .stats-bar-inner{max-width:1080px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);}
.ri .stat-col{text-align:center;padding:0 20px;border-right:1px solid rgba(242,235,229,0.07);}
.ri .stat-col:last-child{border-right:none;}
.ri .stat-big{font-family:'Space Mono',monospace;font-size:44px;font-weight:700;color:var(--orange);line-height:1;}
.ri .stat-label{font-family:Inter,sans-serif;font-size:12px;color:rgba(242,235,229,0.55);margin-top:8px;line-height:1.5;}
.ri .stat-source{font-family:'Space Mono',monospace;font-size:8px;color:rgba(242,235,229,0.2);letter-spacing:0.08em;margin-top:6px;}
.ri-section{padding:96px 80px;}
.ri .section-inner{max-width:1080px;margin:0 auto;}
.ri .section-kicker{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:0.18em;color:var(--orange);margin-bottom:14px;display:flex;align-items:center;gap:8px;}
.ri .section-kicker::before{content:'';width:20px;height:1px;background:var(--orange);}
.ri .section-h2{font-family:'Space Grotesk',sans-serif;font-size:42px;font-weight:700;line-height:1.1;letter-spacing:-1.2px;color:var(--cream);margin-bottom:14px;}
.ri .section-h2 em{font-family:'Cormorant Garamond',serif;font-style:italic;color:var(--orange);font-weight:400;}
.ri .section-sub{font-family:Inter,sans-serif;font-size:16px;line-height:1.65;color:rgba(242,235,229,0.5);max-width:580px;margin-bottom:52px;}
.ri .how-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.ri .how-card{background:rgba(242,235,229,0.025);border:1px solid rgba(242,235,229,0.07);border-radius:16px;padding:30px;transition:border-color 0.2s;position:relative;overflow:hidden;}
.ri .how-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--orange);}
.ri .how-card:hover{border-color:rgba(211,107,66,0.25);}
.ri .how-num{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:0.14em;color:var(--orange);margin-bottom:16px;}
.ri .how-title{font-family:'Space Grotesk',sans-serif;font-size:19px;font-weight:700;color:var(--cream);margin-bottom:10px;line-height:1.3;}
.ri .how-desc{font-family:Inter,sans-serif;font-size:13.5px;line-height:1.65;color:rgba(242,235,229,0.55);}
.ri .how-badge{display:inline-flex;align-items:center;gap:6px;margin-top:18px;font-family:'Space Mono',monospace;font-size:9px;background:rgba(211,107,66,0.1);color:var(--orange);border:1px solid rgba(211,107,66,0.2);padding:5px 11px;border-radius:20px;letter-spacing:0.06em;}
.ri .calc-section{background:var(--green);padding:96px 80px;}
.ri .calc-inner{max-width:1080px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;}
.ri .calc-left h2{font-family:'Space Grotesk',sans-serif;font-size:38px;font-weight:700;color:var(--cream);line-height:1.1;letter-spacing:-1px;margin-bottom:14px;}
.ri .calc-left h2 em{font-family:'Cormorant Garamond',serif;font-style:italic;color:var(--orange);font-weight:400;}
.ri .calc-left p{font-family:Inter,sans-serif;font-size:15px;line-height:1.65;color:rgba(242,235,229,0.55);margin-bottom:0;}
.ri .calc-rate-badge{display:inline-flex;align-items:center;gap:8px;margin-top:20px;background:rgba(211,107,66,0.15);border:1px solid rgba(211,107,66,0.25);border-radius:8px;padding:10px 16px;}
.ri .calc-rate-badge span{font-family:'Space Mono',monospace;font-size:22px;font-weight:700;color:var(--orange);}
.ri .calc-rate-badge p{font-family:Inter,sans-serif;font-size:12px;color:rgba(242,235,229,0.6);margin:0;line-height:1.4;}
.ri .calc-box{background:rgba(10,10,10,0.5);border:1px solid rgba(211,107,66,0.2);border-radius:20px;padding:36px;}
.ri .calc-box-label{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:0.16em;color:rgba(211,107,66,0.6);margin-bottom:24px;}
.ri .calc-field{margin-bottom:20px;}
.ri .calc-field label{font-family:Inter,sans-serif;font-size:13px;font-weight:500;color:rgba(242,235,229,0.7);display:block;margin-bottom:8px;}
.ri .calc-input{width:100%;background:rgba(242,235,229,0.05);border:1px solid rgba(242,235,229,0.12);border-radius:8px;padding:12px 16px;font-family:'Space Mono',monospace;font-size:18px;color:var(--cream);outline:none;transition:border-color 0.2s;}
.ri .calc-input:focus{border-color:var(--orange);}
.ri .calc-input::placeholder{color:rgba(242,235,229,0.2);font-size:15px;}
.ri .calc-divider{height:1px;background:rgba(242,235,229,0.07);margin:24px 0;}
.ri .calc-result-primary{background:rgba(211,107,66,0.12);border:1px solid rgba(211,107,66,0.25);border-radius:12px;padding:24px;margin-bottom:16px;}
.ri .calc-result-label{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:0.14em;color:var(--orange);margin-bottom:8px;}
.ri .calc-result-num{font-family:'Space Mono',monospace;font-size:44px;font-weight:700;color:var(--orange);line-height:1;}
.ri .calc-result-sub{font-family:Inter,sans-serif;font-size:12px;color:rgba(242,235,229,0.45);margin-top:6px;line-height:1.5;}
.ri .calc-result-logic{font-family:'Space Mono',monospace;font-size:9px;color:rgba(242,235,229,0.22);margin-top:8px;letter-spacing:0.06em;}
.ri .calc-breakdown{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;}
.ri .calc-mini{background:rgba(242,235,229,0.04);border:1px solid rgba(242,235,229,0.07);border-radius:10px;padding:14px 16px;text-align:center;}
.ri .calc-mini-num{font-family:'Space Mono',monospace;font-size:22px;font-weight:700;color:var(--cream);}
.ri .calc-mini-label{font-family:Inter,sans-serif;font-size:11px;color:rgba(242,235,229,0.4);margin-top:4px;line-height:1.4;}
.ri .calc-cta-box{background:var(--green);border-radius:12px;padding:20px;text-align:center;border:1px solid rgba(126,200,160,0.15);}
.ri .calc-cta-text{font-family:Inter,sans-serif;font-size:13px;color:rgba(242,235,229,0.6);margin-bottom:12px;line-height:1.5;}
.ri .calc-cta-text strong{color:var(--cream);}
.ri .btn-calc-cta{display:block;background:var(--orange);color:#fff;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:14px;padding:12px 24px;border-radius:8px;text-decoration:none;transition:background 0.2s;}
.ri .btn-calc-cta:hover{background:var(--orange-light);}
.ri .calc-placeholder{text-align:center;padding:32px 0;}
.ri .calc-placeholder-icon{font-size:36px;margin-bottom:12px;opacity:0.3;}
.ri .calc-placeholder-text{font-family:Inter,sans-serif;font-size:13px;color:rgba(242,235,229,0.3);line-height:1.6;}
.ri .proof-section{background:rgba(242,235,229,0.015);}
.ri .proof-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:52px;}
.ri .proof-card{background:var(--dark);border:1px solid rgba(242,235,229,0.07);border-radius:16px;padding:28px;}
.ri .proof-stars{color:var(--orange);font-size:14px;letter-spacing:3px;margin-bottom:16px;}
.ri .proof-quote{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:18px;line-height:1.6;color:var(--cream);margin-bottom:20px;}
.ri .proof-attr{display:flex;align-items:center;gap:12px;}
.ri .proof-avatar{width:34px;height:34px;border-radius:50%;background:var(--green);border:1.5px solid rgba(211,107,66,0.3);display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:12px;color:var(--orange);}
.ri .proof-name{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:13px;color:var(--cream);}
.ri .proof-loc{font-family:'Space Mono',monospace;font-size:9px;color:rgba(242,235,229,0.3);margin-top:2px;letter-spacing:0.06em;}
.ri .proof-result{margin-top:14px;background:rgba(211,107,66,0.08);border:1px solid rgba(211,107,66,0.15);border-radius:7px;padding:8px 12px;font-family:'Space Mono',monospace;font-size:9px;color:var(--orange);letter-spacing:0.1em;}
.ri .upsell-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:48px;}
.ri .upsell-card{border-radius:14px;padding:24px 28px;border:1px solid rgba(242,235,229,0.07);background:rgba(242,235,229,0.02);display:flex;gap:18px;align-items:flex-start;transition:all 0.2s;}
.ri .upsell-card:hover{border-color:rgba(211,107,66,0.2);}
.ri .upsell-icon{width:40px;height:40px;border-radius:9px;background:var(--green);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.ri .upsell-icon svg{width:18px;height:18px;}
.ri .upsell-trigger{font-family:'Space Mono',monospace;font-size:8px;letter-spacing:0.1em;color:var(--orange);margin-bottom:6px;display:block;}
.ri .upsell-title{font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:600;color:var(--cream);margin-bottom:6px;}
.ri .upsell-desc{font-family:Inter,sans-serif;font-size:12.5px;line-height:1.6;color:rgba(242,235,229,0.5);}
.ri .ownership-section{background:var(--green);}
.ri .ownership-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px;}
.ri .own-item{padding:20px 0;}
.ri .own-icon{margin-bottom:16px;}
.ri .own-title{font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:600;color:var(--cream);margin-bottom:8px;}
.ri .own-desc{font-family:Inter,sans-serif;font-size:13px;line-height:1.6;color:rgba(242,235,229,0.5);}
.ri .final-cta{padding:120px 80px;text-align:center;position:relative;overflow:hidden;}
.ri .final-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(211,107,66,0.06) 0%,transparent 70%);pointer-events:none;}
.ri .final-cta h2{font-family:'Space Grotesk',sans-serif;font-size:50px;font-weight:700;color:var(--cream);line-height:1.05;letter-spacing:-1.5px;margin-bottom:16px;}
.ri .final-cta h2 em{font-family:'Cormorant Garamond',serif;font-style:italic;color:var(--orange);font-weight:400;font-size:56px;}
.ri .final-cta p{font-family:Inter,sans-serif;font-size:16px;color:rgba(242,235,229,0.45);margin-bottom:40px;max-width:480px;margin-left:auto;margin-right:auto;line-height:1.65;}
.ri .final-affordability{font-family:'Space Mono',monospace;font-size:10px;color:rgba(242,235,229,0.2);letter-spacing:0.1em;margin-top:20px;}
.ri-footer{background:rgba(242,235,229,0.02);border-top:1px solid rgba(242,235,229,0.05);padding:28px 80px;display:flex;align-items:center;justify-content:space-between;}
.ri .footer-logo{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:15px;color:rgba(242,235,229,0.3);}
.ri .footer-logo span{color:var(--orange);}
.ri .footer-copy{font-family:'Space Mono',monospace;font-size:9px;color:rgba(242,235,229,0.18);letter-spacing:0.08em;}
@media(max-width:860px){
  .ri .hero-inner,.ri .calc-inner{grid-template-columns:1fr;}
  .ri .hero-h1{font-size:40px;}
  .ri .how-grid,.ri .proof-grid,.ri .upsell-grid,.ri .ownership-grid{grid-template-columns:1fr;}
  .ri-section,.ri .calc-section,.ri .final-cta{padding:64px 28px;}
  .ri-nav{padding:0 24px;}
  .ri .stats-bar{padding:36px 28px;}
  .ri .stats-bar-inner{grid-template-columns:1fr 1fr;gap:28px;}
  .ri .stat-col{border-right:none;}
  .ri-footer{padding:28px 24px;flex-direction:column;gap:16px;}
}
`;

const CalculatorPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "NovaReach — Re-Ignite Your HVAC Pipeline";
    }, []);

    const [listSize, setListSize] = useState('');
    const [jobValue, setJobValue] = useState('');

    const RESPONSE_RATE = 0.08;
    const SEASONS_PER_YEAR = 2;

    const list = parseFloat(listSize) || 0;
    const job  = parseFloat(jobValue) || 0;
    const hasData = list > 0 && job > 0;

    const responses = Math.round(list * RESPONSE_RATE);
    const jobs      = responses;
    const revenue   = jobs * job;
    const annual    = revenue * SEASONS_PER_YEAR;

    const fmt = v => v.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0, maximumFractionDigits: 0 });

    return (
        <div className="ri">
            <style>{REIGNITE_STYLES}</style>

            {/* NAV */}
            <nav className="ri-nav">
                <a href="#" className="nav-logo">Nova<span>Reach</span></a>
                <div className="nav-links">
                    <a href="#how">How It Works</a>
                    <a href="#calculator">Calculator</a>
                    <a href="https://getnovareach.com/#booking" target="_blank" rel="noreferrer" className="nav-cta">Book a Call →</a>
                </div>
            </nav>

            {/* HERO */}
            <section className="ri-hero">
                <div className="hero-glow" />
                <div className="hero-glow2" />
                <div className="hero-inner">
                    <div>
                        <div className="hero-kicker">HVAC CONTRACTORS — EASTERN CANADA</div>
                        <h1 className="hero-h1">Your past customers<br />are sitting on<br /><em>jobs you haven't billed.</em></h1>
                        <p className="hero-sub">We automate a <strong>seasonal re-engagement blast</strong> to your existing customer list — fully done-for-you. Most contractors see <strong>5–10 booked jobs</strong> in the first 30 days. Zero ad spend. Nothing extra on your end.</p>
                        <div className="hero-actions">
                            <a href="#calculator" className="btn-primary">Calculate My Revenue Gap →</a>
                            <a href="#how" className="btn-ghost">See How It Works ↓</a>
                        </div>
                        <div className="hero-trust">
                            <span className="trust-item"><span className="trust-dot" />HVAC CONTRACTORS ONLY</span>
                            <span className="trust-item"><span className="trust-dot" />FULLY DONE-FOR-YOU</span>
                            <span className="trust-item"><span className="trust-dot" />NO AD SPEND</span>
                            <span className="trust-item"><span className="trust-dot" />CASL COMPLIANT</span>
                            <span className="trust-item"><span className="trust-dot" />LESS THAN ONE SERVICE CALL/MO</span>
                        </div>
                    </div>
                    <div className="hero-card">
                        <div className="hero-card-label">RE-IGNITE SYSTEM — WHAT TO EXPECT</div>
                        <div className="stat-row">
                            <div className="stat-item"><div className="stat-num">5–10</div><div className="stat-desc"><strong>Booked Jobs</strong>first 30 days from your existing list</div></div>
                            <div className="stat-item"><div className="stat-num">10–20</div><div className="stat-desc"><strong>New Google Reviews</strong>auto-collected after every job</div></div>
                            <div className="stat-item"><div className="stat-num">&lt;60s</div><div className="stat-desc"><strong>AI Response Time</strong>answers inbound while you're on the job</div></div>
                        </div>
                        <div className="hero-divider" />
                        <div className="hero-afford">
                            <strong>COSTS LESS THAN ONE SERVICE CALL PER MONTH</strong>
                            Fully done-for-you. Setup fee waived. Cancel anytime.
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS BAR */}
            <div className="stats-bar">
                <div className="stats-bar-inner">
                    <div className="stat-col"><div className="stat-big">80%</div><div className="stat-label">of homeowners start their contractor search online</div><div className="stat-source">INDUSTRY REALITY 2026</div></div>
                    <div className="stat-col"><div className="stat-big">78%</div><div className="stat-label">hire the first company to respond — not the best one</div><div className="stat-source">LEAD RESPONSE MGMT. STUDY</div></div>
                    <div className="stat-col"><div className="stat-big">5 Min</div><div className="stat-label">after that window odds of closing drop 10× instantly</div><div className="stat-source">HARVARD BUSINESS REVIEW</div></div>
                    <div className="stat-col"><div className="stat-big">$0</div><div className="stat-label">cost per lead from your existing list vs. $60–140 on LSA</div><div className="stat-source">VS. GOOGLE LSA / ANGISTARS</div></div>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <section id="how" className="ri-section">
                <div className="section-inner">
                    <div className="section-kicker">HOW IT WORKS</div>
                    <h2 className="section-h2">Three steps.<br /><em>Zero work on your end.</em></h2>
                    <p className="section-sub">You share your past customer list once. We handle the messaging, timing, follow-up, and booking flow. Your job is to show up to the estimate.</p>
                    <div className="how-grid">
                        <div className="how-card"><div className="how-num">STEP 01</div><div className="how-title">You share your past customer list</div><div className="how-desc">Export contacts from any CRM, spreadsheet, or invoicing tool. We handle import, scrubbing, and segmentation. Upload once — we do the rest.</div><div className="how-badge">⏱ 10 MINUTES ON YOUR END</div></div>
                        <div className="how-card"><div className="how-num">STEP 02</div><div className="how-title">We blast before peak season</div><div className="how-desc">AC tune-up reminders in spring. Furnace checks in fall. Every message timed to hit your list right before the rush — personalized, automated, CASL-compliant.</div><div className="how-badge">📲 AUTOMATED SMS + EMAIL</div></div>
                        <div className="how-card"><div className="how-num">STEP 03</div><div className="how-title">Jobs booked. Reviewed. Re-blasted every season.</div><div className="how-desc">Responses flow into your pipeline automatically. Review requests go out after every job. Your list gets re-engaged each season without you lifting a finger.</div><div className="how-badge">🔁 RUNS EVERY SEASON</div></div>
                    </div>
                </div>
            </section>

            {/* CALCULATOR */}
            <section id="calculator" className="calc-section">
                <div className="calc-inner">
                    <div className="calc-left">
                        <div className="section-kicker" style={{ color: 'rgba(242,235,229,0.4)' }}>REVENUE AT RISK CALCULATOR</div>
                        <h2>How much money is sitting<br /><em>in your old list?</em></h2>
                        <p>Most HVAC contractors have 150–400 past customers they've stopped contacting. Enter your numbers — see what a single seasonal campaign could realistically generate.</p>
                        <div className="calc-rate-badge"><span>8%</span><p>Industry average response rate<br />for warm past-customer campaigns</p></div>
                    </div>
                    <div className="calc-box">
                        <div className="calc-box-label">ENTER YOUR NUMBERS — RESULTS APPEAR INSTANTLY</div>
                        <div className="calc-field">
                            <label>How many past customers are on your list?</label>
                            <input className="calc-input" type="number" placeholder="e.g. 250" value={listSize} onChange={e => setListSize(e.target.value)} min="0" />
                        </div>
                        <div className="calc-field">
                            <label>Your average job value ($CAD)?</label>
                            <input className="calc-input" type="number" placeholder="e.g. 450" value={jobValue} onChange={e => setJobValue(e.target.value)} min="0" />
                        </div>
                        <div className="calc-divider" />

                        {!hasData && (
                            <div className="calc-placeholder">
                                <div className="calc-placeholder-icon">↑</div>
                                <div className="calc-placeholder-text">Enter your list size and average job value above<br />to see your estimated seasonal revenue.</div>
                            </div>
                        )}

                        {hasData && (
                            <div style={{ display: 'block' }}>
                                <div className="calc-result-primary">
                                    <div className="calc-result-label">ESTIMATED REVENUE — ONE SEASONAL CAMPAIGN</div>
                                    <div className="calc-result-num">{fmt(revenue)}</div>
                                    <div className="calc-result-sub">from {list.toLocaleString()} past customers at 8% response rate</div>
                                    <div className="calc-result-logic">{list.toLocaleString()} contacts × 8% = {responses} responses × ${job.toLocaleString()} avg job = {fmt(revenue)}</div>
                                </div>
                                <div className="calc-breakdown">
                                    <div className="calc-mini"><div className="calc-mini-num">{jobs}</div><div className="calc-mini-label">Estimated jobs<br />booked</div></div>
                                    <div className="calc-mini"><div className="calc-mini-num">{responses}</div><div className="calc-mini-label">Contacts who<br />respond</div></div>
                                </div>
                                <div className="calc-cta-box">
                                    <div className="calc-cta-text">This runs <strong>every spring and fall</strong> — automatically. That's <strong>{fmt(annual)}</strong> per year from customers you already earned.</div>
                                    <a href="https://getnovareach.com/#booking" target="_blank" rel="noreferrer" className="btn-calc-cta">Book a Call — See If Your Market Is Available →</a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* PROOF / TESTIMONIALS */}
            <section className="proof-section ri-section">
                <div className="section-inner">
                    <div className="section-kicker">FROM THE FIELD</div>
                    <h2 className="section-h2">HVAC contractors who ran<br /><em>Re-Ignite this spring.</em></h2>
                    <div className="proof-grid">
                        <div className="proof-card">
                            <div className="proof-stars">★★★★★</div>
                            <div className="proof-quote">"Sent a blast to 190 contacts I hadn't touched in two years. Booked 8 tune-ups in the first week. Easiest jobs I've had all spring."</div>
                            <div className="proof-attr"><div className="proof-avatar">MK</div><div><div className="proof-name">Mike K.</div><div className="proof-loc">HVAC CONTRACTOR — HAMILTON, ON</div></div></div>
                            <div className="proof-result">8 JOBS BOOKED — 190-CONTACT LIST — WEEK 1</div>
                        </div>
                        <div className="proof-card">
                            <div className="proof-stars">★★★★★</div>
                            <div className="proof-quote">"I didn't even know I had that many past customers. They set it all up, I just started getting calls. First month paid for itself three times over."</div>
                            <div className="proof-attr"><div className="proof-avatar">DL</div><div><div className="proof-name">Dave L.</div><div className="proof-loc">HVAC &amp; FURNACE — OTTAWA, ON</div></div></div>
                            <div className="proof-result">12 JOBS — 30 DAYS — $0 AD SPEND</div>
                        </div>
                        <div className="proof-card">
                            <div className="proof-stars">★★★★★</div>
                            <div className="proof-quote">"My Google reviews went from 11 to 34 in six weeks. Now I'm ranking above guys who've been in business way longer than me."</div>
                            <div className="proof-attr"><div className="proof-avatar">SR</div><div><div className="proof-name">Steve R.</div><div className="proof-loc">COOLING SYSTEMS — MISSISSAUGA, ON</div></div></div>
                            <div className="proof-result">+23 GOOGLE REVIEWS — 6 WEEKS</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* UPSELL / FULL SYSTEM */}
            <section className="ri-section">
                <div className="section-inner">
                    <div className="section-kicker">THE FULL SYSTEM</div>
                    <h2 className="section-h2">Start with Re-Ignite.<br /><em>Add layers as you grow.</em></h2>
                    <p className="section-sub">Everything below is already built inside the platform. You unlock what you need based on where your business is right now — nothing gets sold that doesn't apply to you.</p>
                    <div className="upsell-grid">
                        <div className="upsell-card">
                            <div className="upsell-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#D36B42" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
                            <div><span className="upsell-trigger">IF: "I NEVER ASK FOR REVIEWS" OR "I HAVE UNDER 30"</span><div className="upsell-title">Review Machine</div><div className="upsell-desc">Auto-collects 5-star reviews after every completed job. 10–20 new reviews per month. Zero effort. Your Google ranking compounds over time.</div></div>
                        </div>
                        <div className="upsell-card">
                            <div className="upsell-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#D36B42" strokeWidth="2"><rect x="2" y="3" width="18" height="14" rx="4"/><path d="M6 21l3-4h6l3 4"/></svg></div>
                            <div><span className="upsell-trigger">IF: "I MISS CALLS WHEN I'M ON A JOB"</span><div className="upsell-title">AI Booking Assistant</div><div className="upsell-desc">Responds to inbound leads in under 60 seconds, 24/7. Qualifies, books, and confirms estimates while you're working. 78% of homeowners hire the first to respond.</div></div>
                        </div>
                        <div className="upsell-card">
                            <div className="upsell-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#D36B42" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
                            <div><span className="upsell-trigger">IF: "I GET MESSAGES EVERYWHERE AND MISS THEM"</span><div className="upsell-title">Unified Lead Inbox</div><div className="upsell-desc">SMS, email, Google My Business, webchat — all in one place on your phone. Missed call text-back included. Every lead captured automatically.</div></div>
                        </div>
                        <div className="upsell-card">
                            <div className="upsell-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#D36B42" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
                            <div><span className="upsell-trigger">IF: "MY WEBSITE IS OLD" OR "I DON'T GET LEADS FROM IT"</span><div className="upsell-title">AI Website</div><div className="upsell-desc">Built in a day. Books estimates automatically. 3.2× more lead capture vs. a standard contractor site. Every lead and review stays on your profile forever.</div></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* OWNERSHIP */}
            <section className="ownership-section ri-section">
                <div className="section-inner">
                    <div className="section-kicker" style={{ color: 'rgba(242,235,229,0.4)' }}>YOU OWN EVERYTHING</div>
                    <h2 className="section-h2">Your website. Your list.<br /><em>Your reviews.</em></h2>
                    <p className="section-sub">We're not a lead rental platform. Everything built for your business stays with your business — permanently.</p>
                    <div className="ownership-grid">
                        <div className="own-item">
                            <div className="own-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D36B42" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
                            <div className="own-title">Your Website Is Yours</div>
                            <div className="own-desc">If you ever leave, you keep the site. No hostage domains, no ransom exports. Your digital property — always.</div>
                        </div>
                        <div className="own-item">
                            <div className="own-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D36B42" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>
                            <div className="own-title">Every Review Stays on Google</div>
                            <div className="own-desc">Reviews go directly to your Google Business Profile — not a walled platform. They stay forever regardless of your relationship with us.</div>
                        </div>
                        <div className="own-item">
                            <div className="own-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D36B42" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg></div>
                            <div className="own-title">Your Customer List Is Yours</div>
                            <div className="own-desc">We never own your contacts. Your list — enriched and segmented — is always exportable in full. No lock-in, no data ransom.</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="final-cta">
                <div className="final-glow" />
                <h2>Stop leaving<br /><em>seasonal revenue</em><br />on the table.</h2>
                <p>Your past customers are ready to book. They just haven't heard from you. That changes in 48 hours.</p>
                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="https://getnovareach.com/#booking" target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize: '16px', padding: '16px 36px' }}>Book a Free Strategy Call →</a>
                    <a href="#calculator" className="btn-ghost" style={{ fontSize: '16px', padding: '16px 24px' }}>Run the Calculator First ↑</a>
                </div>
                <p className="final-affordability">ONE CONTRACTOR PER AREA &nbsp;·&nbsp; LIMITED SPRING AVAILABILITY &nbsp;·&nbsp; COSTS LESS THAN ONE SERVICE CALL/MO</p>
            </section>

            {/* FOOTER */}
            <footer className="ri-footer">
                <div className="footer-logo">Nova<span>Reach</span></div>
                <div className="footer-copy">© 2026 NOVAREACH — HVAC GROWTH SYSTEM — EASTERN CANADA</div>
            </footer>
        </div>
    );
};

function Root() {
    const [hash, setHash] = useState(window.location.hash);
    useEffect(() => {
        const handler = () => setHash(window.location.hash);
        window.addEventListener('hashchange', handler);
        return () => window.removeEventListener('hashchange', handler);
    }, []);

    if (hash === '#/privacy') return <PrivacyPolicyPage />;
    if (hash === '#/terms') return <TermsPage />;
    if (hash === '#/calculator') return <CalculatorPage />;
    return <App />;
}

export default Root;
