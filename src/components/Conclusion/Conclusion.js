import { GridContainer, GridNormal } from "../Layout";

export default function Conclusion() {
  return (
    <GridContainer>
      <GridNormal>
        <section id="conclusion" className="mb-20 mt-20">
          <h1 className="text-4xl">4. Conclusion</h1>

          <ul className="list-disc ml-5 space-y-2">
            <li className="text-base">
              Aims to redefine success using a nuanced approach.
            </li>
            <li className="text-base">
              Introduces the Total Success Index (TSI) to measure achievements
              across individuals or families.
            </li>
            <li className="text-base">
              Offers new insights into historical figures and societal dynamics.
            </li>
            <li className="text-base">
              Plans to explore the possibility of dynamic equilibrium further.
            </li>
          </ul>
        </section>
      </GridNormal>
    </GridContainer>
  );
}
