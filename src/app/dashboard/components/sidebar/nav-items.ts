interface NavItem {
    path: string,
    title: string,
    icon?: string
};

export const generalLinks: NavItem[] = [
    {
        path: 'home',
        title: 'Dashboard',
        icon: 'dashboard'
    },
    {
        path: 'classes',
        title: 'Clases',
        icon: 'assignment'
    },
    {
        path: 'students',
        title: 'Alumnos',
        icon: 'school'
    },
    {
        path: 'inscriptions',
        title: 'Inscripciones',
        icon: 'edit_document'
    },
];

export const settingsLinks: NavItem[] =[
    {
        path: 'account',
        title: 'Cuenta',
        icon: 'account_circle'
    },
];

