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
                        <li>+1 782 377 5142</li>
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
                <div className="w-full relative bg-transparent rounded-3xl overflow-hidden min-h-[900px]">
                    <iframe
                        src="https://link.getnovareach.com/widget/booking/6NcWYvkBLotKqPRTE7q8"
                        style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "900px" }}
                        scrolling="no"
                        id="6NcWYvkBLotKqPRTE7q8_1775751071362"
                    />
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
            Phone: +1 782 377 5142
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
            Phone: +1 782 377 5142
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
            Phone: +1 782 377 5142
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
            <InstantBookingInfo />
            <HowItWorks />
            <Industries />
            <Booking />
            <FAQ />
            <Footer />
        </div>
    );
}


function Root() {
    const [hash, setHash] = useState(window.location.hash);
    useEffect(() => {
        const handler = () => setHash(window.location.hash);
        window.addEventListener('hashchange', handler);
        return () => window.removeEventListener('hashchange', handler);
    }, []);

    if (hash === '#/privacy') return <PrivacyPolicyPage />;
    if (hash === '#/terms') return <TermsPage />;
    return <App />;
}

export default Root;
