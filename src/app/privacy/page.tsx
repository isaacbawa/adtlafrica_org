import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Data Protection and Privacy Policy for AI & Digital Transformative Lab (ADTL) Africa.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:px-10">
      {/* Document Header */}
      <div className="mb-12 border-b border-gray-200 pb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
          AI &amp; Digital Transformative Lab (ADTL) Africa
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm italic text-gray-500">
          Effective Date: 15 March 2026
        </p>
      </div>

      {/* ── PART B ── */}
      {/* <div className="mb-10">
        <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">
          Part B — Data Protection and Privacy Policy
        </h2>
      </div> */}

      <div className="space-y-10 text-gray-800">

        {/* B-1 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            1. Introduction and Commitment to Privacy
          </h3>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              AI &amp; Digital Transformative Lab (ADTL) Africa is committed to protecting the privacy and personal data of all individuals who interact with the organisation, including website visitors, programme participants, partner schools, educators, students, and SME clients. This Policy explains how we collect, use, store, share, and protect personal data in compliance with applicable data protection laws, including the Ghana Data Protection Act, 2012 (Act 843) and internationally recognised data protection principles.
            </p>
            <p>
              By using the Platform or engaging with ADTL Africa&apos;s services, you consent to the practices described in this Policy.
            </p>
          </div>
        </section>

        {/* B-2 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            2. Personal Data We Collect
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">2.1 Data Provided Directly by You</h4>
              <p className="mb-3 text-base leading-relaxed">
                We collect personal data that you provide voluntarily when you:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed">
                <li>Register for a training programme or workshop.</li>
                <li>Submit an enquiry or contact form on the Platform.</li>
                <li>Subscribe to our newsletter or communications.</li>
                <li>Register as a user of the AI Tutor or any other digital tool.</li>
                <li>Apply for partnership or collaboration arrangements.</li>
              </ul>
              <p className="mt-3 text-base leading-relaxed">
                The types of data collected may include: full name, email address, phone number, school or institution name, job title or role, academic level, and payment information where applicable.
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-gray-900">2.2 Data Collected Automatically</h4>
              <p className="mb-3 text-base leading-relaxed">
                When you visit the Platform, we may automatically collect certain technical data including:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed">
                <li>IP address and general geographic location.</li>
                <li>Browser type and version.</li>
                <li>Pages visited and time spent on the Platform.</li>
                <li>Referring website or source.</li>
                <li>Device type and operating system.</li>
              </ul>
              <p className="mt-3 text-base leading-relaxed">
                This data is collected through cookies and similar tracking technologies as described in Section 7 of this Policy.
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-gray-900">2.3 Data Relating to Minors</h4>
              <p className="text-base leading-relaxed">
                ADTL Africa serves students including those under 18 years of age through its SHS and university programmes. Where personal data is collected from or in relation to minors, ADTL Africa takes additional care to ensure appropriate safeguards are in place. Where required by applicable law, consent from a parent or guardian will be obtained prior to processing a minor&apos;s personal data.
              </p>
            </div>
          </div>
        </section>

        {/* B-3 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            3. Lawful Basis for Processing
          </h3>
          <p className="mb-3 text-base leading-relaxed">
            ADTL Africa processes personal data on one or more of the following lawful bases under the Ghana Data Protection Act, 2012:
          </p>
          <ul className="list-disc space-y-3 pl-6 text-base leading-relaxed">
            <li>
              <span className="font-semibold">Consent:</span> Where you have provided clear, informed consent to the processing of your data for a specific purpose.
            </li>
            <li>
              <span className="font-semibold">Contract Performance:</span> Where processing is necessary to fulfil a programme enrolment, service agreement, or other contractual obligation.
            </li>
            <li>
              <span className="font-semibold">Legitimate Interests:</span> Where processing is necessary for ADTL Africa&apos;s legitimate organisational interests, such as improving services, fraud prevention, or communication with stakeholders, provided such interests are not overridden by your rights.
            </li>
            <li>
              <span className="font-semibold">Legal Obligation:</span> Where processing is required by Ghanaian law or a lawful court order.
            </li>
          </ul>
        </section>

        {/* B-4 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            4. How We Use Your Personal Data
          </h3>
          <p className="mb-3 text-base leading-relaxed">
            ADTL Africa uses personal data for the following purposes:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed">
            <li>To process programme registrations and deliver training services.</li>
            <li>To communicate with you about your enrolment, events, or programme updates.</li>
            <li>To issue Certificates of Completion and maintain records of programme participation.</li>
            <li>To send newsletters and organisational updates where you have subscribed or consented.</li>
            <li>To improve the Platform and our programmes through analysis of usage data.</li>
            <li>To personalise the AI Tutor experience based on user role and academic context.</li>
            <li>To comply with legal and regulatory obligations.</li>
            <li>To detect and prevent fraud, abuse, or security incidents.</li>
          </ul>
          <p className="mt-4 text-base leading-relaxed">
            ADTL Africa will not use your personal data for any purpose incompatible with the purposes for which it was originally collected without your prior consent.
          </p>
        </section>

        {/* B-5 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            5. Sharing of Personal Data
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">5.1 Within ADTL Africa</h4>
              <p className="text-base leading-relaxed">
                Personal data is shared internally within ADTL Africa only on a need-to-know basis, limited to staff and volunteers who require access to perform their roles.
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-gray-900">5.2 With Third Parties</h4>
              <p className="mb-3 text-base leading-relaxed">
                We may share personal data with trusted third-party service providers who assist in operating the Platform or delivering our programmes, including:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed">
                <li>Website hosting and cloud services providers.</li>
                <li>Email and communication platforms.</li>
                <li>Payment processing service providers.</li>
                <li>Analytics service providers.</li>
              </ul>
              <p className="mt-3 text-base leading-relaxed">
                All third-party processors are required to handle personal data in accordance with applicable data protection laws and to implement appropriate security measures. ADTL Africa does not sell, rent, or trade personal data to third parties for marketing purposes under any circumstances.
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-gray-900">5.3 Legal Disclosures</h4>
              <p className="text-base leading-relaxed">
                We may disclose personal data where required by law, a court order, or a lawful request from a government authority in Ghana. We will notify affected individuals where legally permitted to do so.
              </p>
            </div>
          </div>
        </section>

        {/* B-6 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            6. Data Retention
          </h3>
          <p className="mb-3 text-base leading-relaxed">
            ADTL Africa retains personal data only for as long as is necessary to fulfil the purposes for which it was collected, or as required by applicable law. As a general guide:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed">
            <li>Programme registration and participation records: retained for a minimum of 5 years from the date of completion.</li>
            <li>Financial and payment records: retained for a minimum of 7 years in accordance with Ghanaian financial regulations.</li>
            <li>Website usage data: retained for up to 24 months.</li>
            <li>Newsletter subscriber data: retained until you unsubscribe or withdraw consent.</li>
          </ul>
          <p className="mt-4 text-base leading-relaxed">
            At the end of the applicable retention period, personal data will be securely deleted or anonymised.
          </p>
        </section>

        {/* B-7 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            7. Cookies and Tracking Technologies
          </h3>
          <p className="mb-6 text-base leading-relaxed">
            The Platform uses cookies and similar technologies to enhance user experience and gather usage analytics. Cookies are small text files stored on your device when you visit a website.
          </p>

          <div className="space-y-6">
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">7.1 Types of Cookies We Use</h4>
              <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed">
                <li>
                  <span className="font-semibold">Essential Cookies:</span> Required for the Platform to function properly. These cannot be disabled.
                </li>
                <li>
                  <span className="font-semibold">Analytics Cookies:</span> Help us understand how users interact with the Platform (e.g., pages visited, time on site). We use this information to improve our services.
                </li>
                <li>
                  <span className="font-semibold">Preference Cookies:</span> Remember your settings and choices on the Platform.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-gray-900">7.2 Cookie Management</h4>
              <p className="text-base leading-relaxed">
                You can control and manage cookies through your browser settings. Disabling certain cookies may affect the functionality of the Platform. Where required by law, we will seek your consent before placing non-essential cookies on your device.
              </p>
            </div>
          </div>
        </section>

        {/* B-8 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            8. Your Data Protection Rights
          </h3>
          <p className="mb-3 text-base leading-relaxed">
            Under the Ghana Data Protection Act, 2012 (Act 843), you have the following rights in relation to your personal data:
          </p>
          <ul className="list-disc space-y-3 pl-6 text-base leading-relaxed">
            <li>
              <span className="font-semibold">Right of Access:</span> You may request a copy of the personal data ADTL Africa holds about you.
            </li>
            <li>
              <span className="font-semibold">Right to Rectification:</span> You may request correction of inaccurate or incomplete personal data.
            </li>
            <li>
              <span className="font-semibold">Right to Erasure:</span> You may request deletion of your personal data where it is no longer necessary for the purpose for which it was collected, subject to legal retention obligations.
            </li>
            <li>
              <span className="font-semibold">Right to Object:</span> You may object to the processing of your data for direct marketing or where processing is based on legitimate interests.
            </li>
            <li>
              <span className="font-semibold">Right to Withdraw Consent:</span> Where processing is based on consent, you may withdraw your consent at any time without affecting the lawfulness of processing carried out prior to withdrawal.
            </li>
            <li>
              <span className="font-semibold">Right to Complain:</span> You have the right to lodge a complaint with the Data Protection Commission of Ghana if you believe your data has been handled unlawfully.
            </li>
          </ul>
          <p className="mt-4 text-base leading-relaxed">
            To exercise any of these rights, please contact us at:{" "}
            <a
              href="mailto:legal@adtlafrica.org"
              className="font-medium text-gray-900 underline underline-offset-2"
            >
              legal@adtlafrica.org
            </a>
            . We will respond to all requests within 30 days of receipt, in accordance with applicable law.
          </p>
        </section>

        {/* B-9 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            9. Data Security
          </h3>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              ADTL Africa implements appropriate technical and organisational security measures to protect personal data against unauthorised access, disclosure, alteration, loss, or destruction. These measures include:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Encryption of data in transit using SSL/TLS protocols.</li>
              <li>Restricted access controls, with data accessible only to authorised personnel.</li>
              <li>Regular review of data handling practices and security protocols.</li>
              <li>Secure storage of physical records containing personal data.</li>
            </ul>
            <p>
              Notwithstanding the above, no method of data transmission or storage over the internet is entirely secure. ADTL Africa cannot guarantee absolute security of personal data. In the event of a data breach that is likely to result in a risk to the rights and freedoms of individuals, ADTL Africa will notify the Data Protection Commission and affected individuals as required by law.
            </p>
          </div>
        </section>

        {/* B-10 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            10. International Data Transfers
          </h3>
          <p className="text-base leading-relaxed">
            ADTL Africa operates primarily in Ghana and across Africa. Where personal data is transferred to service providers or partners located outside Ghana, ADTL Africa will ensure that appropriate safeguards are in place to protect the data, including contractual protections consistent with the requirements of the Ghana Data Protection Act, 2012.
          </p>
        </section>

      </div>

      {/* ── PART C ── */}
      <div className="mb-10 mt-16 border-t border-gray-200 pt-12">
        <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">
          Legal Provisions
        </h2>
      </div>

      <div className="space-y-10 text-gray-800">

        {/* C-1 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            1. Child Safety and Safeguarding
          </h3>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              ADTL Africa is committed to the safety, dignity, and wellbeing of all children and young people who engage with its programmes. The organisation implements a Child Safeguarding Policy applicable to all staff, volunteers, and facilitators. Where programmes are delivered in schools, ADTL Africa facilitators are required to comply with the safeguarding policies of the host institution.
            </p>
            <p>
              Any person who suspects or witnesses any form of abuse, exploitation, or harm involving a minor in connection with ADTL Africa&apos;s activities is required to report it immediately to ADTL Africa leadership and to the appropriate Ghanaian authorities.
            </p>
          </div>
        </section>

        {/* C-2 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            2. Ethical Use of Artificial Intelligence
          </h3>
          <p className="mb-3 text-base leading-relaxed">
            ADTL Africa is committed to the responsible and ethical deployment of artificial intelligence in all its programmes and tools. The ADTL Africa AI Tutor and any other AI-powered systems developed by the organisation adhere to the following principles:
          </p>
          <ul className="list-disc space-y-3 pl-6 text-base leading-relaxed">
            <li>
              <span className="font-semibold">Transparency:</span> Users are informed when they are interacting with an AI system.
            </li>
            <li>
              <span className="font-semibold">Accuracy and Relevance:</span> The AI Tutor is trained exclusively on the Ghana SHS curriculum to ensure contextually appropriate and relevant responses.
            </li>
            <li>
              <span className="font-semibold">Non-discrimination:</span> AI systems are designed to serve all students equitably, regardless of location, socio-economic status, or ability.
            </li>
            <li>
              <span className="font-semibold">Human Oversight:</span> AI tools are positioned as learning aids, with teachers retaining primary responsibility for educational outcomes.
            </li>
            <li>
              <span className="font-semibold">Data Minimisation:</span> The AI Tutor collects and processes only the data necessary to deliver personalised learning support.
            </li>
          </ul>
          <p className="mt-4 text-base leading-relaxed">
            ADTL Africa&apos;s AI ethics framework is informed by internationally recognised principles including the UNESCO Recommendation on the Ethics of AI and the African Union&apos;s emerging AI governance frameworks.
          </p>
        </section>

        {/* C-3 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            3. Not-for-Profit Status and Accountability
          </h3>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              AI &amp; Digital Transformative Lab (ADTL) Africa is a registered not-for-profit organisation operating under Ghanaian law. The organisation&apos;s activities are conducted solely in furtherance of its social mission. Any revenue generated through fees or services is directed entirely towards programme delivery, operational sustainability, and expanding the organisation&apos;s reach and impact.
            </p>
            <p>
              ADTL Africa is accountable to its beneficiaries, partners, and the communities it serves. The organisation is committed to transparency in its governance and financial management.
            </p>
          </div>
        </section>

        {/* C-4 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            4. Partnerships and Collaborations
          </h3>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              ADTL Africa welcomes partnerships with schools, universities, government bodies, development organisations, corporate entities, and international partners who share the organisation&apos;s commitment to digital transformation and educational equity in Africa. Any formal partnership arrangement will be governed by a separate written agreement between the parties.
            </p>
            <p>
              ADTL Africa does not endorse any partner organisation&apos;s products, services, or positions unless explicitly stated in a formal written agreement.
            </p>
          </div>
        </section>

        {/* C-5 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            5. Contact and Data Protection Officer
          </h3>
          <p className="mb-6 text-base leading-relaxed">
            For any queries, concerns, or requests relating to these Terms, this Policy, or ADTL Africa&apos;s data practices, please contact:
          </p>

          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="w-1/3 bg-gray-50 px-5 py-3 font-semibold text-gray-900">
                    Organisation
                  </td>
                  <td className="px-5 py-3 text-gray-800">
                    AI &amp; Digital Transformative Lab (ADTL) Africa
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-50 px-5 py-3 font-semibold text-gray-900">
                    Email
                  </td>
                  <td className="px-5 py-3 text-gray-800">
                    <a
                      href="mailto:legal@adtlafrica.org"
                      className="font-medium text-gray-900 underline underline-offset-2"
                    >
                      legal@adtlafrica.org
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-50 px-5 py-3 font-semibold text-gray-900">
                    Website
                  </td>
                  <td className="px-5 py-3 text-gray-800">
                    <a
                      href="https://www.adtlafrica.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-gray-900 underline underline-offset-2"
                    >
                      www.adtlafrica.org
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-50 px-5 py-3 font-semibold text-gray-900">
                    Jurisdiction
                  </td>
                  <td className="px-5 py-3 text-gray-800">Republic of Ghana</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-base leading-relaxed">
            If you are not satisfied with our response to a complaint, you may contact the Data Protection Commission of Ghana at{" "}
            <a
              href="https://www.dataprotection.org.gh"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-900 underline underline-offset-2"
            >
              www.dataprotection.org.gh
            </a>
            .
          </p>
        </section>

        {/* C-6 */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            6. General Provisions
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">6.1 Entire Agreement</h4>
              <p className="text-base leading-relaxed">
                These Terms, together with the Privacy Policy and any additional terms applicable to specific programmes or services, constitute the entire agreement between you and ADTL Africa with respect to your use of the Platform and supersede all prior agreements and understandings.
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-gray-900">6.2 Severability</h4>
              <p className="text-base leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid under applicable law, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-gray-900">6.3 Waiver</h4>
              <p className="text-base leading-relaxed">
                ADTL Africa&apos;s failure to enforce any right or provision of these Terms shall not constitute a waiver of that right or provision.
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-gray-900">6.4 Language</h4>
              <p className="text-base leading-relaxed">
                These Terms are written in English. In the event of any discrepancy between a translated version and the English version, the English version shall prevail.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
