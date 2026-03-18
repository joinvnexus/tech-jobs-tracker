import { getSeekerProfileData } from "./actions"
import {  SeekerProfileClient } from "./seeker-profile-client"

export default async function SeekerProfilePage() {
  const { user, profile } = await getSeekerProfileData()
  
  return <SeekerProfileClient user={user} profile={profile} />
}
