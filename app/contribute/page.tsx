import type { Metadata } from "next";
import Nav from "../components/Nav";
import ContributionExperience from "./ContributionExperience";
import Footer from "../sections/Footer";

export const metadata: Metadata = {
  title: "Contribute | Philadelphia Declaration 250",
  description:
    "Add a signature, propose a principle, or contribute another perspective to the Philadelphia Declaration.",
};

export default function ContributePage() {
  return (
    <>
      <Nav visible sectionHrefPrefix="/#" />
      <main>
        <ContributionExperience />
        <Footer />
      </main>
    </>
  );
}
