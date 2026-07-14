export interface StorefrontRaw {
    id:         string;
    type:       string;
    href:       string;
    attributes: StorefrontAttributes;
}

export type Storefront = {
    id: string;
    type: string;
} & StorefrontAttributes

export interface StorefrontAttributes {
    explicitContentPolicy:  string;
    name:                   string;
    defaultLanguageTag:     string;
    supportedLanguageTags:  string[];
}
