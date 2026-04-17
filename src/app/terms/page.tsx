import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Website Terms & Conditions of Use for AI & Digital Transformative Lab (ADTL) Africa.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:px-10">
      {/* Document Header */}
      <div className="mb-12 border-b border-gray-200 pb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
          AI &amp; Digital Transformative Lab (ADTL) Africa
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-4 text-sm italic text-gray-500">
          Effective Date: 15 March 2026
        </p>
      </div>

      {/* Part A Label */}
      {/* <div className="mb-10">
        <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">
          Terms and Conditions
        </h2>
      </div> */}

      <div className="space-y-10 text-gray-800">

        {/* Section 1 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            1. Acceptance of Terms
          </h3>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              By accessing, browsing, or using the website and any digital platforms operated by ADTL Africa (collectively, the &quot;Platform&quot;), you confirm that you have read, understood, and agree to be legally bound by these Terms and Conditions (&quot;Terms&quot;). These Terms constitute a legally binding agreement between you (&quot;User&quot;, &quot;you&quot;, or &quot;your&quot;) and AI &amp; Digital Transformative Lab (ADTL) Africa (&quot;ADTL Africa&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
            </p>
            <p>
              If you do not agree with any part of these Terms, you must immediately cease using the Platform. Your continued use of the Platform following any update to these Terms constitutes your acceptance of the revised Terms.
            </p>
            <p>
              These Terms apply to all visitors, registered users, programme participants, partner organisations, and any other persons accessing the Platform in any capacity.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            2. About ADTL Africa
          </h3>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              AI &amp; Digital Transformative Lab (ADTL) Africa is a not-for-profit organisation registered and operating under the laws of the Republic of Ghana. The organisation is dedicated to advancing digital transformation, artificial intelligence adoption, and digital skills development across Africa. ADTL Africa operates the Platform to provide information about its programmes, to deliver training and digital services, and to facilitate communication with stakeholders, partners, schools, and the general public.
            </p>
            <p>
              The Platform may include information about ADTL Africa&apos;s three core pillars: SME and School Digital Transformation, Capacity Building Programmes, and the Personalised SHS AI Tutor, as well as any other services, tools, or resources offered by the organisation from time to time.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            3. Eligibility and User Responsibilities
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">3.1 Eligibility</h4>
              <p className="mb-3 text-base leading-relaxed">You may use the Platform if:</p>
              <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed">
                <li>You are at least 13 years of age. Users under 18 must have consent from a parent or guardian.</li>
                <li>You are a teacher, school administrator, student, SME owner, partner organisation, or any other individual with a legitimate interest in ADTL Africa&apos;s programmes and services.</li>
                <li>You are legally capable of entering into binding contracts under applicable Ghanaian law.</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-gray-900">3.2 User Responsibilities</h4>
              <p className="mb-3 text-base leading-relaxed">By using the Platform, you agree to:</p>
              <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed">
                <li>Provide accurate, current, and complete information when registering or submitting forms.</li>
                <li>Use the Platform only for lawful purposes and in a manner that does not infringe the rights of others.</li>
                <li>Not attempt to gain unauthorised access to any part of the Platform or its underlying systems.</li>
                <li>Not use the Platform to distribute unsolicited communications, harmful software, or illegal content.</li>
                <li>Not misrepresent your identity or affiliation with any organisation.</li>
                <li>Notify ADTL Africa promptly of any suspected security breach or unauthorised use of your account.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            4. Programmes and Services
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">4.1 Programme Enrolment</h4>
              <p className="text-base leading-relaxed">
                ADTL Africa offers various training programmes and digital services including, but not limited to, Teacher AI Integration Training, SHS Software Development Bootcamps, University Coding Programmes, and Digital Transformation services for schools and SMEs. Enrolment in any programme is subject to availability, eligibility requirements, and payment of applicable fees where stated.
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-gray-900">4.2 Fees and Payment</h4>
              <p className="text-base leading-relaxed">
                Where a fee is payable for a programme or service, ADTL Africa will clearly state the amount prior to enrolment or engagement. All fees are quoted in Ghana Cedis (GH₵) unless otherwise stated. Fees must be paid in full before participation unless a written payment arrangement has been agreed. ADTL Africa reserves the right to revise its fee schedule with reasonable prior notice.
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-gray-900">4.3 Certificates</h4>
              <p className="text-base leading-relaxed">
                Certificates of Completion are issued to participants who fulfil the full requirements of a programme. Certificates are issued solely by ADTL Africa and represent completion of the programme as described. ADTL Africa makes no representation that a certificate constitutes a formal academic qualification under any external accreditation framework unless explicitly stated.
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-gray-900">4.4 Modifications to Programmes</h4>
              <p className="text-base leading-relaxed">
                ADTL Africa reserves the right to modify, cancel, or reschedule any programme or service at its discretion. In the event of a cancellation by ADTL Africa, registered participants will be notified and offered a refund or an alternative programme placement where applicable.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            5. Intellectual Property
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">5.1 Ownership</h4>
              <p className="text-base leading-relaxed">
                All content on the Platform, including but not limited to text, graphics, logos, images, training materials, curriculum resources, software, code, the AI Tutor system, and any other materials produced by or for ADTL Africa, is the exclusive intellectual property of AI &amp; Digital Transformative Lab (ADTL) Africa or its licensors, and is protected under the laws of Ghana and applicable international intellectual property conventions.
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-gray-900">5.2 Permitted Use</h4>
              <p className="mb-3 text-base leading-relaxed">
                Users are granted a limited, non-exclusive, non-transferable, and revocable licence to access and use the Platform and its content for personal, non-commercial, and educational purposes only. This licence does not extend to:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed">
                <li>Reproducing, distributing, or commercially exploiting any content without written authorisation from ADTL Africa.</li>
                <li>Modifying, adapting, or creating derivative works from ADTL Africa materials.</li>
                <li>Removing or altering any copyright, trademark, or other proprietary notices.</li>
                <li>Using ADTL Africa&apos;s name, logo, or brand identity without prior written consent.</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-gray-900">5.3 AI Tutor and Proprietary Systems</h4>
              <p className="text-base leading-relaxed">
                The ADTL Africa Personalised SHS AI Tutor, its underlying architecture, training data, outputs, and associated systems are proprietary to ADTL Africa. Users of the AI Tutor are granted access solely for the educational purpose for which the tool is provided. Any attempt to reverse-engineer, replicate, extract training data from, or commercialise the AI Tutor is strictly prohibited.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            6. Disclaimers and Limitation of Liability
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">6.1 No Warranty</h4>
              <p className="text-base leading-relaxed">
                The Platform and all content are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, express or implied. ADTL Africa does not warrant that the Platform will be uninterrupted, error-free, or free from viruses or other harmful components.
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-gray-900">6.2 Educational Content</h4>
              <p className="text-base leading-relaxed">
                While ADTL Africa takes reasonable care to ensure the accuracy of its training materials and curriculum resources, it makes no representation that content is free from error or that it will meet every user&apos;s specific requirements. Users should independently verify any information before relying on it for significant decisions.
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-gray-900">6.3 AI Tutor Outputs</h4>
              <p className="text-base leading-relaxed">
                The AI Tutor is designed to support learning within the Ghana SHS curriculum. Its outputs are generated by an AI system and should be used as a learning aid only. ADTL Africa does not guarantee that AI Tutor responses will be entirely accurate in all cases. Teachers and students should exercise independent judgement when engaging with AI-generated content.
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-gray-900">6.4 Limitation of Liability</h4>
              <p className="text-base leading-relaxed">
                To the fullest extent permitted by applicable law, ADTL Africa shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising from your use of or inability to use the Platform or its services, even if ADTL Africa has been advised of the possibility of such damages.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            7. Third-Party Links and Integrations
          </h3>
          <p className="text-base leading-relaxed">
            The Platform may contain links to third-party websites or integrated tools not operated by ADTL Africa. These links are provided for convenience only. ADTL Africa does not endorse, control, or take responsibility for the content, privacy practices, or terms of any third-party website or service. You access third-party content at your own risk.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            8. Termination of Access
          </h3>
          <p className="text-base leading-relaxed">
            ADTL Africa reserves the right to suspend or terminate your access to the Platform at any time, without notice, if you breach these Terms or engage in any conduct that ADTL Africa determines, in its sole discretion, to be harmful to the Platform, the organisation, or other users. Termination does not affect any rights or obligations that arose prior to the date of termination.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            9. Governing Law and Dispute Resolution
          </h3>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Republic of Ghana. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of the Republic of Ghana.
            </p>
            <p>
              Where a dispute arises, ADTL Africa encourages parties to first seek resolution through good-faith negotiation. If negotiation fails, parties may refer the matter to mediation under the auspices of the Ghana Arbitration Centre before resorting to litigation.
            </p>
          </div>
        </section>

        {/* Section 10 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            10. Changes to These Terms
          </h3>
          <p className="text-base leading-relaxed">
            ADTL Africa reserves the right to amend these Terms at any time. Revised Terms will be posted on the Platform with an updated effective date. Where changes are material, ADTL Africa will endeavour to notify registered users by email. Continued use of the Platform after the posting of revised Terms constitutes your acceptance of the changes.
          </p>
        </section>

      </div>
    </main>
  );
}
