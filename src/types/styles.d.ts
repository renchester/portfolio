// Next.js only ships type declarations for *.module.* stylesheets; plain
// side-effect imports (`import './Component.scss'`) need these ambient
// declarations to satisfy TS2882 in TypeScript 5.9+.
declare module '*.scss';
declare module '*.sass';
declare module '*.css';
