
type ProfileParams = {
 id: string
}

export default async function ProfilePage({params}: {params: Promise<ProfileParams>}) {
 
 return(<div className="flex flex-col items-center justify-center min-h-screen py-2">
  <h1>Profile</h1>
  <hr />
  <span className="p-2 ml-2 rounded bg-orange-500 text-black">Profile page {(await params).id}</span>
 </div>)
}