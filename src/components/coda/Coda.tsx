import './Coda.scss';
import ContourField from '../hero/ContourField';
import { AUTHOR_QUERYResult } from '@/sanity/types';

// Bulacan plain — the terrain the hero opens on, surveyed once more
const SURVEY_COORDS = '14.7946° N, 120.8792° E';

/**
 * Terrain coda — a decompression zone between the inquiry form and the
 * title block. The same generative contour field that opens the site
 * closes it, bookending the survey.
 */
function Coda({ author }: { author: AUTHOR_QUERYResult }) {
  return (
    <section className="coda" aria-label="Closing terrain">
      <ContourField />
      <span className="coda__mark coda__mark--tl" aria-hidden>
        Site survey — {author?.location ?? 'Bulacan, Philippines'}
      </span>
      <span className="coda__mark coda__mark--br" aria-hidden>
        {SURVEY_COORDS}
      </span>
    </section>
  );
}

export default Coda;
