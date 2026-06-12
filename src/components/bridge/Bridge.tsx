import './Bridge.scss';
import BridgeStatement from './BridgeStatement';
import { AUTHOR_QUERYResult } from '@/sanity/types';

const FALLBACK_STATEMENT =
  'Trained in architecture, practicing engineering — I design digital systems where structure and detail carry equal weight.';

/** Narrative pivot between the About and Experience sections. */
function Bridge({ author }: { author: AUTHOR_QUERYResult }) {
  const statement = author?.statement || FALLBACK_STATEMENT;

  return (
    <section className="bridge" aria-label="Statement">
      <div className="bridge__wrapper">
        <BridgeStatement text={statement} />
      </div>
    </section>
  );
}

export default Bridge;
