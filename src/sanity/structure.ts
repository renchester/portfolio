import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio')
    .items([
      S.documentTypeListItem('author').title('Author Details'),
      S.documentTypeListItem('experience').title('Work Experience'),
      S.divider(),
      S.documentTypeListItem('greeting').title('Greetings'),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('stack').title('Tech Stack'),
      S.divider(),
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.divider(),
    ]);
