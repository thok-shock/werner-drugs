import React from "react";
import { Card, Container } from "react-bootstrap";

export default function Home(props) {
  return (
    <Container>
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>Welcome to Werner Drugs</Card.Title>
          <Card.Subtitle className="text-muted">by Ryan S Werner</Card.Subtitle>
          <div className="mt-3">
            <div>
              <strong>Designed for Pharmacists</strong>
              <p>
                This website was created after identifying the need for a
                concise pharmacy tool that can be used to provide very brief
                clinical and counseling pearls. Materials on this site do not
                consitute medical advice.
              </p>
            </div>
            <div>
              <strong>Who am I?</strong>
              <p>
                My name is Ryan S Werner. I am a DPH-4 student with the
                University of Wisconsin - Madison School of Pharmacy, and am on
                rotations with health systems in Milwaukee, WI. I also have a
                strong background in web development which I believe can help
                improve the education of both medical professionals and
                patients.
              </p>
            </div>
            <div>
              <strong>Actual Resources</strong>
              <p>
                I very much enjoy Lexicomp. However, there are plenty of sites
                that I would recommend:
              </p>
              <ul>
                <li>
                  <a href="https://online.lexi.com/">Lexicomp</a> (
                  <a href="http://digital.library.wisc.edu/1711.web/lexicomp">
                    through UW-Madison
                  </a>
                  )
                </li>
                <li>
                  <a href="https://www.uptodate.com/contents/search">
                    UpToDate
                  </a>{" "}
                  (
                  <a href="http://digital.library.wisc.edu/1711.web/uptodate">
                    through UW-Madison
                  </a>
                  )
                </li>
                <li>
                  <a href="https://www.nhs.uk/medicines/">NHS Medicines A-Z</a>
                </li>
                <li>
                  <a href="https://www.mayoclinic.org/drugs-supplements">
                    Mayo Clinic
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
