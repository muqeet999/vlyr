import Link from "next/link";

import { DiagnosticAnnotation } from "@/components/site/DiagnosticAnnotation";
import { CinematicHero } from "@/components/site/CinematicHero";
import { FieldNote } from "@/components/site/FieldNote";
import { HeroTitle } from "@/components/site/HeroTitle";
import { ProcessLoop } from "@/components/site/ProcessLoop";
import { SectionMark } from "@/components/site/SectionMark";
import { SolutionCards } from "@/components/site/SolutionCards";
import { TeamMember } from "@/components/site/TeamMember";
import { solutionsData } from "@/data/solutions";
import { teamData } from "@/data/team";

const symptoms = [
  { copy: "A WhatsApp inbox that takes hours to answer, on a number customers already trust.", note: "RESPONSE / 01" },
  { copy: "Regulars nobody's tracking, so every week starts from zero.", note: "RETENTION / 02" },
  { copy: "Reviews sitting unanswered exactly where new customers are deciding.", note: "REPUTATION / 03" },
  { copy: "A website that looks fine and converts nobody.", note: "CONVERSION / 04" },
];

export default function Home() {
  return (
    <div className="home-page">
      <CinematicHero />

      <section className="chapter hero" id="diagnosis" data-chapter>
        <div className="hero__inner">
          <SectionMark number="01" label="The Problem" />
          <p className="eyebrow">VLYR / Digital Growth Studio — Srinagar</p>
          <HeroTitle />
          <p className="hero__lede">
            They have a growth problem that happens to need better tools. We find where yours is actually losing customers,
            revenue, or time — then fix that, with whatever it actually takes.
          </p>
        </div>
        <span className="hero__measure" aria-hidden="true">START / 001</span>
      </section>

      <section className="chapter diagnosis" id="diagnosis" data-chapter>
        <div className="diagnosis__intro">
          <SectionMark number="02" label="What We Actually See" />
          <h2>Here&apos;s what shows up, over and over:</h2>
        </div>
        <ol className="symptom-list">
          {symptoms.map((symptom, index) => (
            <li key={symptom.note}>
              <span className="symptom-list__index">0{index + 1}</span>
              <p>{symptom.copy}</p>
              <DiagnosticAnnotation label={symptom.note} />
            </li>
          ))}
        </ol>
        <p className="diagnosis__closing">None of these are website problems. All of them get treated like one anyway.</p>
      </section>

      <section className="chapter method" id="method" data-chapter>
        <div className="method__heading">
          <SectionMark number="03" label="The Method" />
          <h2>The method doesn&apos;t change. The output does.</h2>
        </div>
        <ProcessLoop />
      </section>

      <section className="chapter solutions" id="solutions" data-chapter>
        <div className="solutions__heading">
          <SectionMark number="04" label="Symptom → System" />
          <p>Start with the symptom. The system follows.</p>
        </div>
        <SolutionCards solutions={solutionsData} />
      </section>

      <section className="chapter field-notes" id="field-notes" data-chapter>
        <div className="field-notes__heading">
          <SectionMark number="05" label="Field Notes" />
          <h2>No case studies live yet. Here&apos;s the kind of thing we actually find:</h2>
        </div>
        {/* Phase 2: interactive self-diagnostic quiz — not building this yet, a mediocre version would undercut the section above it. */}
        <div className="field-notes__list">
          <FieldNote index="01">
            A restaurant with a five-star reputation and a five-minute average reply time on the platform customers actually use
            to book. The food was never the problem.
          </FieldNote>
          <FieldNote index="02">
            A clinic with strong walk-in trust and no way to bring a patient back for a follow-up without a phone call from the
            front desk.
          </FieldNote>
        </div>
        <p className="field-notes__closing">
          This is what &quot;diagnose first&quot; looks like before it&apos;s a case study on a website.
        </p>
      </section>

      <section className="chapter team" id="team" data-chapter>
        <div className="team__heading">
          <SectionMark number="06" label="Who&apos;s Behind This" />
          <h2>Four people. No account managers. No handoffs.</h2>
        </div>
        <ol className="team__list">
          {teamData.map((member, index) => (
            <TeamMember key={member.name} member={member} index={index} />
          ))}
        </ol>
      </section>

      <section className="chapter contact-cta" id="contact" data-chapter>
        <div className="contact-cta__inner">
          <SectionMark number="07" label="Start Here" />
          <h2>Tell us what&apos;s actually broken.</h2>
          <p>Not what you think needs building. What&apos;s actually not working.</p>
          <Link href="/contact" className="diagnosis-button" data-cursor="open">
            Start the diagnosis <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
