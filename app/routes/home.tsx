import type { Route } from './+types/home'
import { Welcome } from '../welcome/welcome'

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Autotolppa' },
        { name: 'description', content: 'Auto lämpimäks' },
    ]
}

export default function Home() {
    return <Welcome />
}
