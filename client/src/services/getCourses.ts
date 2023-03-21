export async function getCourses(group: string) {


    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/courses?group=${group}`);
        http://localhost:5000/courses?group=ARAB
        // const courses = await response.json();
        return response;
    }
    catch (error) {
        console.log(error)
    }
}