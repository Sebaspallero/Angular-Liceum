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
        path: 'professors',
        title: 'Profesores',
        icon: 'badge'
    },
    {
        path: 'students',
        title: 'Alumnos',
        icon: 'school'
    },
];

export const settingsLinks: NavItem[] =[
    {
        path: 'settings',
        title: 'Ajustes',
        icon: 'settings'
    },
    {
        path: 'account',
        title: 'Cuenta',
        icon: 'account_circle'
    },
    {
        path: 'log-out',
        title: 'Log Out',
        icon: 'logout'
    },
];

