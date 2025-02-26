import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useModerator = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    // console.log(user?.email)
    
    const {data: isModerator, isPending: isModeratorLoading} = useQuery({
        queryKey: [user?.email, 'moderator'],
        enabled: !!user?.email,
        queryFn: async() => {
            const res = await axiosSecure.get(`/users/moderator/${user.email}`);
            // console.log(res.data);
            return res.data.moderator
        }
    })
    return [isModerator, isModeratorLoading]
};

export default useModerator;