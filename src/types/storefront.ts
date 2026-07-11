export interface StorefrontRaw {
    id:         string;
    type:       string;
    href:       string;
    attributes: Attributes;
}

export type Storefront = {
    id: string;
    type: string;
} & Attributes

export interface Attributes {
    explicitContentPolicy:  string;
    name:                   string;
    defaultLanguageTag:     string;
    supportedLanguageTags:  string[];
}
