export class CustomMenuItem {
    constructor() {
        this.Label = null;
        this.Icon = null;
        this.RouterLink = null;
        this.Childs = null;
        this.IsChildVisible = false;
        this.Role = null;
    }
    Label: string;
    Icon?: string;
    RouterLink: string;
    Childs: CustomMenuItem[];
    IsChildVisible: boolean;
    Role: string;
}
