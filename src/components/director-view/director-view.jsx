import React from 'react';
import { Row, Col, Image, Container } from 'react-bootstrap';

export const Director = () => {
	return (
		<>
			<Container >
				<Row>
					<Col className='text-center'>
						<Image className='py-3' src='https://www.themoviedb.org/t/p/original/b1LH059EGnU01rsZwcqYzNjY7w9.jpg' rounded />
					</Col>
					<Col >
						<h1 className='py-3'>Wes Anderson</h1>
						<div className='py-2'>
							<h4 className='fw-bold'>Biography</h4>
							<p>
								Wesley Wales Anderson (born May 1, 1969) is an American filmmaker. His films are known for their symmetry, eccentricity and distinctive visual and narrative styles, and he is cited by some critics as a modern-day example of the auteur.
							</p>
							<p>
								Anderson attended the University of Texas in Austin, where he majored in philosophy. It was there that he met Owen Wilson. They became friends and began making short films, some of which aired on a local cable-access station. One of their shorts was Bottle Rocket (1994), which starred Owen and his brother Luke Wilson. The short was screened at the Sundance Film Festival, where it was successfully received, so much so that they received funding to make a feature-length version.
							</p>
						</div>
						<div className='py-2'>
							<h4 className='fw-bold'>Themes and stories</h4>
							<p>
								Anderson has mostly directed fast-paced comedies marked by more serious or melancholic elements, with themes often centered on grief, loss of innocence, dysfunctional families, parental abandonment, adultery, sibling rivalry and unlikely friendships. His movies have been noted as unusually character-driven and, by turns, both derided and praised with terms like "literary geek chic"
							</p>
						</div>
						<div className='py-2'>
							<h4 className='fw-bold'>Visual style</h4>
							<p>
								Anderson has been noted for extensive use of flat space camera moves, symmetrical compositions, knolling, snap-zooms, slow-motion walking shots, a deliberately limited color palette, and handmade art direction often utilizing miniatures.[65] These stylistic choices give his movies a distinctive quality that has provoked much discussion, critical study, supercuts, mash-ups, and parody. Many writers, critics, and Anderson himself have commented that this gives his movies the feel of being "self-contained worlds" or a "scale-model household".
							</p>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
}