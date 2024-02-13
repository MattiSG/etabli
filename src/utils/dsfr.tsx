import { headerFooterDisplayItem } from '@codegouvfr/react-dsfr/Display';
import type { DefaultColorScheme } from '@codegouvfr/react-dsfr/next-appdir';
import { BadgeProps } from '@mui/material/Badge';

export const defaultColorScheme: DefaultColorScheme = 'system';

export const brandTop = (
  <>
    COLLECTIVITÉS
    <br />
    FRANÇAISES
  </>
);

export const homeLinkProps = {
  href: '/',
  title: 'Accueil - Établi',
};

export const commonHeaderAttributes = {
  brandTop: brandTop,
  homeLinkProps: homeLinkProps,
  serviceTitle: 'Établi',
  serviceTagline: 'Service public de médiation',
};

export const commonFooterAttributes = {
  accessibility: 'non compliant' as any,
  accessibilityLinkProps: {
    // TODO: waiting for the following to be solved https://github.com/zilch/type-route/issues/125
    // href: linkRegistry.get('accessibility', undefined),
    href: '/accessibilite',
  },
  brandTop: brandTop,
  contentDescription: 'Ce site est géré par les collectivités.',
  homeLinkProps: homeLinkProps,
  termsLinkProps: {
    // href: linkRegistry.get('legalNotice', undefined),
    href: '/mentions-legales',
  },
  // websiteMapLinkProps: {{
  //   href: '#',
  // }}
  bottomItems: [
    {
      iconId: undefined as any,
      linkProps: {
        // href: linkRegistry.get('privacyPolicy', undefined),
        href: '/politique-de-confidentialite',
      },
      text: 'Politique de confidentialité',
    },
    {
      iconId: undefined as any,
      linkProps: {
        // href: linkRegistry.get('termsOfUse', undefined),
        href: '/conditions-generales-d-utilisation',
      },
      text: `Conditions générales d'utilisation`,
    },
    headerFooterDisplayItem,
  ],
  license: (
    <>
      Sauf mention contraire, tous les contenus de ce site sont sous{' '}
      <a href="https://raw.githubusercontent.com/betagouv/etabli/main/LICENSE" target="_blank" rel="noreferrer">
        licence AGPL-3.0
      </a>{' '}
    </>
  ),
};

export const unprocessedMessagesBadgeAttributes: BadgeProps = {
  max: 99,
  title: 'Nombre de messages non-traités',
  color: 'error',
  sx: {
    display: 'inline-flex',
    alignItems: 'center',
    '& .MuiBadge-badge': {
      position: 'relative',
      transform: 'none',
      marginLeft: '0.5rem',
    },
  },
};