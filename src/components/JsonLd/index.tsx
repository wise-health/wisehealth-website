import React from 'react';
import Head from '@docusaurus/Head';

export interface JsonLdProps {
  /** A schema.org object (or array of them) to emit as JSON-LD. */
  schema: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Emits structured data into <head>.
 *
 * Docusaurus renders pages statically, so this JSON-LD is present in the
 * served HTML — crawlers see it without executing JavaScript. Previously the
 * homepage put its <script type="application/ld+json"> inside the <header>
 * body, which works but is non-standard; <head> is where validators and
 * Google's Rich Results Test expect it.
 */
export default function JsonLd({ schema }: JsonLdProps): React.ReactNode {
  const blocks = Array.isArray(schema) ? schema : [schema];
  return (
    <Head>
      {blocks.map((block, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Head>
  );
}
