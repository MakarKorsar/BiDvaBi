/*export interface FoundationPageList {
    goto(pageUrl?: string): Promise<void>;
    search(value: string): Promise<void>;
}

export interface FoundationPageCreate {
    save(): Promise<void>;
    cancel(): Promise<void>;
}

export interface FoundationEditElement {
    save(): Promise<void>;
    undo(): Promise<void>;
}*/

export interface Login {
    goto(pageUrl?: string): Promise<void>;
}

export interface Localizer {
    goto(pageUrl?: string): Promise<void>;
}