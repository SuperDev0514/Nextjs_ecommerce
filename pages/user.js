import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { LogOut } from '@geist-ui/icons'
import {
    useToasts,
    Description,
    Button,
    Text,
    Divider,
    Loading,
    Card,
    Grid,
    useTheme,
    Collapse,
    Snippet,
    Table,
} from '@geist-ui/core'

import Layout from '../components/Layout'
import { GoogleIcon } from '../components/SVGs'
import { handleUserData } from '../handlers/userHandlers'
import { logoutHandler } from '../handlers/authHandlers'
import getGoogleURL from '../helpers/getGoogleURL'
import useWindowSize from '../hooks/useWindowSize'
import { useAuth } from '../state/Auth'
import { useThemeProvider } from '../state/Theme'

import config from '../config/main.config'
import i18n from '../config/i18n.config'

export default function ({ auth }) {
    const theme = useTheme()
    const router = useRouter()
    const { setToast } = useToasts()
    const { setLocalAuthentication } = useAuth()
    const { width, height } = useWindowSize()

    setLocalAuthentication(auth)

    const { locale = config.defaultLocale } = router

    const folio = i18n['root']['user']
    const title = folio['title'][locale]
    const description = folio['description'][locale]

    const [user, setUser] = useState({})

    async function resolve() {
        const response = await axios.get(config.backend.routes.user)
        handleUserData({
            response,
            router,
            setUser,
            setToast,
            noDataToast: i18n['toasts']['noData'][locale],
            notVerifiedToast: i18n['toasts']['notVerified'][locale],
        })
    }

    useEffect(() => {
        resolve()
    }, [])

    const UserInfo = ({ user }) => (
        <Grid.Container gap={1}>
            <Grid xs={24} md={12}>
                {user.name && (
                    <Description
                        width="100%"
                        title="Name"
                        content={
                            <Text width="100%" mt={0} blockquote font="1rem">
                                {user.name}
                            </Text>
                        }
                    />
                )}
            </Grid>
            <Grid xs={24} md={12}>
                <Description
                    width="100%"
                    title="Email"
                    content={
                        <Text width="100%" mt={0} blockquote font="1rem">
                            {user.email}
                        </Text>
                    }
                />
            </Grid>
            <Grid xs={24} md={12}>
                <Description
                    width="100%"
                    title="Referral Code"
                    content={
                        <Snippet
                            font="1rem"
                            toastText="✓ Referral-Code copied!"
                            toastType="default"
                            text={user.referral_code}
                        />
                    }
                />
            </Grid>
        </Grid.Container>
    )

    const Orders = ({ user }) => (
        <Card id="Orders" width="100%">
            {user.orders && (
                <Table data={user.orders}>
                    <Table.Column prop="link" label="Link" width={100} />
                    <Table.Column prop="createdAt" label="Date" width={220} />
                    <Table.Column prop="totalPrice" label="Price" />
                    <Table.Column prop="isPaid" label="Paid" />
                    <Table.Column prop="isDelivered" label="Delivered" />
                </Table>
            )}
        </Card>
    )

    const Referrals = ({ user }) => (
        <Card width="100%">
            {user.referrals && (
                <Table data={user.referrals}>
                    <Table.Column prop="createdAt" label="Date" />
                    <Table.Column prop="totalPrice" label="Price" />
                </Table>
            )}
        </Card>
    )

    const Integrations = ({ user }) => (
        <Grid.Container width="100%" gap={1}>
            <Grid width="100%" xs={24} sm={12} md={8}>
                {user.integrations && user.integrations.google.id ? (
                    <Button
                        icon={<GoogleIcon color={theme.palette.code} />}
                        disabled
                        type="secondary"
                        width="100%"
                        style={{
                            border: `1px solid ${theme.palette.code}`,
                            color: theme.palette.code,
                        }}
                        onClick={() => {}}
                    >
                        Integrated with Google
                    </Button>
                ) : (
                    <a style={{ width: '100%' }} href={getGoogleURL()}>
                        <Button
                            icon={<GoogleIcon />}
                            type="secondary"
                            width="100%"
                            onClick={() => {}}
                        >
                            Integrate with Google
                        </Button>
                    </a>
                )}
            </Grid>
        </Grid.Container>
    )

    const Logout = () => (
        <Button
            icon={<LogOut />}
            scale={1.2}
            type="secondary"
            px={2}
            onClick={(e) =>
                logoutHandler({
                    config,
                    setToast,
                    setLocalAuthentication,
                    router,
                    toast: i18n['toasts']['logout'][locale],
                })
            }
            width={width < 650 && '100%'}
            auto={width > 650}
        >
            <b>LOGOUT</b>
        </Button>
    )

    return (
        <>
            <Layout
                config={config}
                i18n={i18n}
                useThemeProvider={useThemeProvider}
                metaTitle={title}
            >
                <Grid.Container gap={1}>
                    {user ? (
                        <>
                            <Grid width="100%" xs={24}>
                                <Card
                                    width="100%"
                                    style={{
                                        backgroundColor:
                                            theme.palette.accents_1,
                                    }}
                                >
                                    <Collapse.Group>
                                        <Collapse
                                            title="User Info"
                                            subtitle="Basic information you have provided."
                                        >
                                            <UserInfo user={user} />
                                        </Collapse>
                                        <Collapse
                                            title="Orders"
                                            subtitle="Your order history."
                                        >
                                            <Orders user={user} />
                                        </Collapse>
                                        <Collapse
                                            title="Referrals"
                                            subtitle="Your referral history."
                                        >
                                            <Referrals user={user} />
                                        </Collapse>
                                        <Collapse
                                            title="Integrations"
                                            subtitle="Your integrations with different third-party services."
                                        >
                                            <Integrations user={user} />
                                        </Collapse>

                                        <Collapse
                                            title="Logout"
                                            subtitle="Where you can log out."
                                            style={{ borderBottom: 'none' }}
                                        >
                                            <Logout />
                                        </Collapse>
                                    </Collapse.Group>
                                </Card>
                            </Grid>
                        </>
                    ) : (
                        <Grid xs={24}>
                            <Card>
                                <Loading />
                            </Card>
                        </Grid>
                    )}
                </Grid.Container>
            </Layout>
            <style jsx global>
                {`
                    .group-tabs > button {
                        background-color: ${theme.palette.accents_1}!important;
                    }
                    .group-content > .fieldset > .content {
                        background-color: ${theme.palette.accents_1};
                    }
                    tbody > tr:last-child > td {
                        border-bottom: none !important;
                    }
                    a {
                        color: ${theme.palette.code}!important;
                    }
                `}
            </style>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const { AJWT } = ctx.req.cookies

    return {
        props: { auth: AJWT ? true : false },
    }
}
