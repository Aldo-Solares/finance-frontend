// @/app/(protected)/admin/concept/page.tsx

import { ConceptPage } from '@/modules/debts/concept/components/concept-page';
import { findAllConcepts } from '@/modules/debts/concept/services/concept.service';

export default async function ConceptRoutePage() {
  const concepts = await findAllConcepts();

  return (
    <ConceptPage concepts={concepts} />
  );
}