export async function getCourses(groups: string[]) {

    const queryParams = groups.map((group, index) => `group${index}=${group}`).join("&")


    try {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/courses?${queryParams}`)
            .then(res => res.json())
            .then(data => {
                return data
            })
    }
    catch (error) {
        console.log(error)
    }
}