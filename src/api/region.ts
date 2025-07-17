
export type RegionType = {
    id: number;
    name: string;
};

export const getRegions = async (): Promise<RegionType[]> => {
    const res = await fetch("http://localhost:8080/api/regions");

    if (!res.ok) throw new Error("Failed to fetch regions");
    
    return await res.json() as RegionType[];
}