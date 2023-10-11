interface ILocation {
    locality: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    maplocation: string;
}

export interface ICompany {
    name: string;
    email: string;
    logo: string;
    contactNumber?: string;
    website: string;
    foundedDate: Date;
    location: ILocation[];
    teamSize: string;
    category: string;
    about: string;
    jobPosts: string[];
    socialSites: string[];
}