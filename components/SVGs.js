import { useTheme } from '@geist-ui/core'

export const GoogleIcon = () => {
    const theme = useTheme()

    return (
        <svg
            fill={theme.palette.accents_4}
            width="1024px"
            height="1024px"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
        >
            <path d="M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8-34.4 23-78.3 36.6-129.9 36.6-99.9 0-184.4-67.5-214.6-158.2-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1 56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100-149.9 0-279.6 86-342.7 211.4-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93 72.5-66.8 114.4-165.2 114.4-282.1 0-27.2-2.4-53.3-6.9-78.5z" />
        </svg>
    )
}

export const DarkModeIcon = () => {
    const theme = useTheme()

    return (
        <svg
            width="35px"
            height="35px"
            viewBox="0 0 35 35"
            data-name="Layer 2"
            id="Layer_2"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill={theme.palette.accents_4}
                d="M18.44,34.68a18.22,18.22,0,0,1-2.94-.24,18.18,18.18,0,0,1-15-20.86A18.06,18.06,0,0,1,9.59.63,2.42,2.42,0,0,1,12.2.79a2.39,2.39,0,0,1,1,2.41L11.9,3.1l1.23.22A15.66,15.66,0,0,0,23.34,21h0a15.82,15.82,0,0,0,8.47.53A2.44,2.44,0,0,1,34.47,25,18.18,18.18,0,0,1,18.44,34.68ZM10.67,2.89a15.67,15.67,0,0,0-5,22.77A15.66,15.66,0,0,0,32.18,24a18.49,18.49,0,0,1-9.65-.64A18.18,18.18,0,0,1,10.67,2.89Z"
            />
        </svg>
    )
}

export const LightModeIcon = () => {
    const theme = useTheme()

    return (
        <svg
            fill={theme.palette.accents_4}
            width="35px"
            height="35px"
            viewBox="0 0 35 35"
            data-name="Layer 2"
            id="b6de87db-e731-4627-aba6-6a97c219f0be"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M17.5,25.88a8.38,8.38,0,1,1,8.38-8.38A8.389,8.389,0,0,1,17.5,25.88Zm0-14.26a5.88,5.88,0,1,0,5.88,5.88A5.887,5.887,0,0,0,17.5,11.62Z" />
            <path d="M17.5,5.471h-.034A1.251,1.251,0,0,1,16.25,4.187l.075-2.721A1.267,1.267,0,0,1,17.609.25a1.251,1.251,0,0,1,1.215,1.284l-.075,2.721A1.249,1.249,0,0,1,17.5,5.471Z" />
            <path d="M26.893,9.364a1.25,1.25,0,0,1-.859-2.158l1.978-1.871A1.25,1.25,0,0,1,29.73,7.151L27.752,9.022A1.242,1.242,0,0,1,26.893,9.364Z" />
            <path d="M33.5,18.837h-.036l-2.722-.077a1.249,1.249,0,0,1-1.213-1.284,1.211,1.211,0,0,1,1.285-1.214l2.721.077a1.25,1.25,0,0,1-.035,2.5Z" />
            <path d="M28.748,30.13a1.248,1.248,0,0,1-.909-.392L25.97,27.759a1.25,1.25,0,1,1,1.817-1.717l1.869,1.98a1.249,1.249,0,0,1-.908,2.108Z" />
            <path d="M17.4,34.75h-.037a1.249,1.249,0,0,1-1.213-1.285l.079-2.721a1.25,1.25,0,0,1,2.5.072l-.079,2.721A1.249,1.249,0,0,1,17.4,34.75Z" />
            <path d="M6.112,29.989a1.249,1.249,0,0,1-.857-2.159l1.98-1.867A1.25,1.25,0,1,1,8.95,27.781L6.969,29.648A1.242,1.242,0,0,1,6.112,29.989Z" />
            <path d="M4.221,18.72H4.184l-2.721-.081A1.25,1.25,0,0,1,.251,17.352,1.237,1.237,0,0,1,1.537,16.14l2.721.081a1.25,1.25,0,0,1-.037,2.5Z" />
            <path d="M8.135,9.335a1.248,1.248,0,0,1-.91-.393L5.359,6.961a1.25,1.25,0,1,1,1.82-1.715L9.046,7.228a1.251,1.251,0,0,1-.911,2.107Z" />
        </svg>
    )
}
