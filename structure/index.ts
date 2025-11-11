import type {StructureResolver} from 'sanity/structure'
import {IoExtensionPuzzle} from 'react-icons/io5'

const pages = ((S) =>
  S.listItem()
    .title('Page')
    .schemaType('page')
    .child(S.documentTypeList('page').title('Pages'))) satisfies StructureResolver

const reusablePageBlocks = ((S) =>
  S.listItem()
    .title('Reusable Page Blocks')
    .icon(IoExtensionPuzzle)
    .child(
      S.documentTypeList('reusablePageBlock').title('Reusable Page Blocks'),
    )) satisfies StructureResolver

const documentComponents = ((S) =>
  S.listItem()
    .title('Document Components')
    .child(
      S.list()
        .title('Document Components')
        .items([
          S.listItem()
            .title('Hero Section')
            .schemaType('hero')
            .child(S.documentTypeList('hero').title('Hero Sections')),
          S.listItem()
            .title('Video')
            .schemaType('video')
            .child(S.documentTypeList('video').title('Videos')),
          S.listItem()
            .title('Carousel')
            .schemaType('carousel')
            .child(S.documentTypeList('carousel').title('Carousels')),
        ]),
    )) satisfies StructureResolver

export const structure = ((S) =>
  S.defaults().items([
    pages(S),
    S.divider(),
    reusablePageBlocks(S),
    S.divider(),
    documentComponents(S),
  ])) satisfies StructureResolver
