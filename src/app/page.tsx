import Link from "next/link";
import { ArrowUpRight, MapPin, ShieldCheck } from "lucide-react";
import { ProgrammeExplorer } from "@/components/programme-explorer";
import { StoryCarousel } from "@/components/story-carousel";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { getCatchments, getDirections, getHomeTestimonials, getMetrics, getPillars, getTracks } from "@/lib/content";

export const revalidate = 300;

export default async function Home() {
  const [tracks, pillars, metrics, catchments, directions, stories] = await Promise.all([
    getTracks(), getPillars(), getMetrics(), getCatchments(), getDirections(), getHomeTestimonials(),
  ]);
  return <>
    <section className="weave-hero">
      <div className="weave-container weave-hero-inner">
        <div className="weave-hero-copy">
          <span className="weave-eyebrow">Ikorodu, Lagos / Nigeria</span>
          <h1>ADJ Educational<br />Consultants<span>.</span></h1>
          <p>Prepare with purpose. Arrive ready.</p>
          <div className="weave-hero-description">In-person classes, live group tutorials and admissions guidance that stays with you through matriculation.</div>
          <div className="weave-actions"><Link className="weave-action" href="#programmes">Find your programme <ArrowUpRight size={20} /></Link><Link className="weave-link" href="/about">Meet ADJ <ArrowUpRight size={20} /></Link></div>
        </div>
        <span className="weave-hero-note">Rooted here.<br />Ready for what comes next.</span>
      </div>
    </section>
    <div className="weave-metrics"><div className="weave-container">{metrics.map(metric => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div></div>
    <section className="weave-programmes" id="programmes"><div className="weave-container">
      <div className="weave-section-heading"><div><span className="weave-eyebrow">01 / Your next chapter</span><h2>Different ambitions.<br />A path for yours.</h2></div><Link className="weave-link" href="/programs">All programmes <ArrowUpRight size={20} /></Link></div>
      <ProgrammeExplorer tracks={tracks} />
    </div></section>
    <section className="weave-method" id="about"><div className="weave-container weave-method-grid">
      <div className="weave-method-intro"><span className="weave-eyebrow">02 / The ADJ approach</span><h2>Discipline.<br />Direction.<br /><em>Possibility.</em></h2><p>Old-school academic discipline. Modern admissions counselling. Accountability at every step.</p><div className="weave-partner"><ShieldCheck size={25} /><p>Academic delivery partnership with <strong>{site.partner.name}</strong>, {site.partner.area}.</p></div></div>
      <div className="weave-method-list">{pillars.map((pillar, index) => <Reveal key={pillar.title} delay={index * 50}><article><span className="weave-step">0{index + 1}</span><div><h3>{pillar.title}</h3><p>{pillar.copy}</p><small>{pillar.tag}</small></div></article></Reveal>)}</div>
    </div></section>
    <section className="weave-stories" id="results"><div className="weave-container weave-stories-grid"><div><span className="weave-eyebrow">03 / Beyond the exam</span><h2>Their next chapter<br />started here.</h2><Link className="weave-link" href="/results">Explore student results <ArrowUpRight size={20} /></Link></div><StoryCarousel stories={stories} /></div></section>
    <section className="weave-community" id="catchment"><div className="weave-container">
      <span className="weave-eyebrow">04 / Close to home. Open to everywhere.</span><div className="weave-community-heading"><h2>See you in<br /><em>Lagos.</em></h2><p>Join our in-person group classes, or connect from anywhere through live online tutorials.</p></div>
      <div className="weave-locations">{catchments.map(place => <span key={place}><MapPin size={16} />{place}</span>)}</div>
      <div className="weave-directions">{directions.map((direction, index) => <div key={direction.from}><span>0{index + 1}</span><h3>{direction.from}</h3><p>{direction.copy}</p></div>)}</div>
    </div></section>
  </>;
}
