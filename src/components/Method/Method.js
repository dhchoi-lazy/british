import Gyeyu from "./Gyeyu";
import { GridNormal, GridHighlight, GridContainer } from "../Layout";

export default function Method() {
  return (
    <section id="method">
      <GridContainer>
        <h1 className="text-4xl">Gyeyu Revolte of 1453</h1>
        <GridHighlight>
          <Gyeyu />
        </GridHighlight>
        <GridNormal>
          <div className="explanation ">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Network Visualization: Gyeyu Revolt of 1453
            </h2>

            <p className="text-lg mb-4">
              This network visualization depicts the communication and social
              interactions during the Gyeyu Revolt of 1453 in Joseon Korea. Key
              features include:
            </p>

            <ul className="list-disc ml-5 space-y-2 mb-6">
              <li className="text-lg">
                Three central royal figures: King Danjong and his uncles Suyang
                and Anpyeong
              </li>
              <li className="text-lg">
                Bureaucrats and their connections to these royal figures
              </li>
              <li className="text-lg">
                Edges represent co-appearances in historical records during a
                two-month period around the revolt
              </li>
              <li className="text-lg">
                Node colors indicate post-revolt status:
                <ul className="list-circle ml-5 mt-2">
                  <li className="text-lg text-blue-600">
                    Blue: Purged by Suyang
                  </li>
                  <li className="text-lg text-red-600">
                    Red: Decorated (rewarded) by Suyang
                  </li>
                </ul>
              </li>
            </ul>

            <p className="text-lg font-semibold text-gray-800 mb-2">
              The visualization reveals how social networks correlate with
              political outcomes:
            </p>
            <ul className="list-disc ml-5 space-y-2 mb-6">
              <li className="text-lg">
                Purged individuals tend to be closer to Anpyeong in the network
              </li>
              <li className="text-lg">
                Decorated individuals tend to be closer to Suyang
              </li>
            </ul>

            <p className="text-lg font-semibold text-gray-800 mb-2">
              The inset graph shows:
            </p>
            <ul className="list-disc ml-5 space-y-2 mb-6">
              <li className="text-lg">
                Eigenvector centrality: Indicates closeness to central figures
                (partisanship)
              </li>
              <li className="text-lg">
                Betweenness centrality: Indicates intermediary roles between
                central nodes
              </li>
            </ul>
          </div>
        </GridNormal>
      </GridContainer>
    </section>
  );
}
