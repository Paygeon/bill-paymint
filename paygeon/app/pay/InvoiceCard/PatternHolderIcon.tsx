import { memo, SVGProps } from 'react';

const PatternHolderIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 190 251' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <g clipPath='url(#clip0_2603_2400)'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M24.9873 2.40126C24.9873 -2.79091 29.1964 -7 34.3886 -7C39.5807 -7 43.7898 -2.79091 43.7898 2.40126V6.19874C43.7898 11.0595 47.7303 15 52.5911 15C57.4519 15 61.3923 11.0595 61.3923 6.19874V2.40126C61.3923 -2.79091 65.6014 -7 70.7936 -7C75.9858 -7 80.1949 -2.79091 80.1949 2.40126V6.19874C80.1949 11.0595 84.1353 15 88.9961 15C93.8569 15 97.7974 11.0595 97.7974 6.19874V2.40126C97.7974 -2.79091 102.006 -7 107.199 -7C112.391 -7 116.6 -2.79091 116.6 2.40126V6.19874C116.6 11.0595 120.54 15 125.401 15C130.262 15 134.202 11.0595 134.202 6.19874V2.40126C134.202 -2.79091 138.411 -7 143.604 -7C148.796 -7 153.005 -2.79091 153.005 2.40126V6.19874C153.005 11.0595 156.945 15 161.806 15C166.667 15 170.607 11.0595 170.607 6.19874V2.40126C170.607 -2.79091 174.817 -7 180.009 -7C185.201 -7 189.41 -2.79091 189.41 2.40126V6.19874C189.41 11.0595 193.35 15 198.211 15C203.072 15 207.012 11.0595 207.012 6.19874V5.3V-6.7H207.612V5.3V6.19874V17.3V18.1987V29.3V30.1987V41.3V42.1987V53.3V54.1987V65.3V66.1987V77.3V78.1987V89.3V90.1987V101.3V102.199V113.3V114.199V125.3V126.199V137.3V138.199V149.3V150.199V161.05V162.199V172.8V173.949V185.699C207.612 190.891 203.403 195.1 198.211 195.1C193.019 195.1 188.81 190.891 188.81 185.699V181.901C188.81 177.04 184.87 173.1 180.009 173.1C175.148 173.1 171.207 177.04 171.207 181.901V185.699C171.207 190.891 166.998 195.1 161.806 195.1C156.614 195.1 152.405 190.891 152.405 185.699V181.901C152.405 177.04 148.464 173.1 143.604 173.1C138.743 173.1 134.802 177.04 134.802 181.901V185.699C134.802 190.891 130.593 195.1 125.401 195.1C120.209 195.1 116 190.891 116 185.699V181.901C116 177.04 112.059 173.1 107.199 173.1C102.338 173.1 98.3974 177.04 98.3974 181.901V185.699C98.3974 190.891 94.1883 195.1 88.9961 195.1C83.8039 195.1 79.5949 190.891 79.5949 185.699V181.901C79.5949 177.04 75.6544 173.1 70.7936 173.1C65.9328 173.1 61.9923 177.04 61.9923 181.901V185.699C61.9923 190.891 57.7833 195.1 52.5911 195.1C47.3989 195.1 43.1898 190.891 43.1898 185.699V181.901C43.1898 177.04 39.2494 173.1 34.3886 173.1C29.5278 173.1 25.5873 177.04 25.5873 181.901V183.05V194.8H24.9873V183.05V181.901V171.3V170.151V159.3V158.401V147.3V146.401V135.3V134.401V123.3V122.401V111.3V110.401V99.3V98.4013V87.3V86.4013V75.3V74.4013V63.3V62.4013V51.3V50.4013V39.3V38.4013V27.3V26.4013V15.3V14.4013V2.40126ZM25.5873 178.589C26.9269 175.031 30.3621 172.5 34.3886 172.5C39.5807 172.5 43.7898 176.709 43.7898 181.901V185.699C43.7898 190.56 47.7303 194.5 52.5911 194.5C57.4519 194.5 61.3923 190.56 61.3923 185.699V181.901C61.3923 176.709 65.6014 172.5 70.7936 172.5C75.9858 172.5 80.1949 176.709 80.1949 181.901V185.699C80.1949 190.56 84.1353 194.5 88.9961 194.5C93.8569 194.5 97.7974 190.56 97.7974 185.699V181.901C97.7974 176.709 102.006 172.5 107.199 172.5C112.391 172.5 116.6 176.709 116.6 181.901V185.699C116.6 190.56 120.54 194.5 125.401 194.5C130.262 194.5 134.202 190.56 134.202 185.699V181.901C134.202 176.709 138.411 172.5 143.604 172.5C148.796 172.5 153.005 176.709 153.005 181.901V185.699C153.005 190.56 156.945 194.5 161.806 194.5C166.667 194.5 170.607 190.56 170.607 185.699V181.901C170.607 176.709 174.817 172.5 180.009 172.5C185.201 172.5 189.41 176.709 189.41 181.901V185.699C189.41 190.56 193.35 194.5 198.211 194.5C203.072 194.5 207.012 190.56 207.012 185.699V177.261C205.673 180.819 202.238 183.35 198.211 183.35C193.019 183.35 188.81 179.141 188.81 173.949V170.151C188.81 165.29 184.87 161.35 180.009 161.35C175.148 161.35 171.207 165.29 171.207 170.151V173.949C171.207 179.141 166.998 183.35 161.806 183.35C156.614 183.35 152.405 179.141 152.405 173.949V170.151C152.405 165.29 148.464 161.35 143.604 161.35C138.743 161.35 134.802 165.29 134.802 170.151V173.949C134.802 179.141 130.593 183.35 125.401 183.35C120.209 183.35 116 179.141 116 173.949V170.151C116 165.29 112.059 161.35 107.199 161.35C102.338 161.35 98.3974 165.29 98.3974 170.151V173.949C98.3974 179.141 94.1883 183.35 88.9961 183.35C83.8039 183.35 79.5949 179.141 79.5949 173.949V170.151C79.5949 165.29 75.6544 161.35 70.7936 161.35C65.9328 161.35 61.9923 165.29 61.9923 170.151V173.949C61.9923 179.141 57.7833 183.35 52.5911 183.35C47.3989 183.35 43.1898 179.141 43.1898 173.949V170.151C43.1898 165.29 39.2494 161.35 34.3886 161.35C29.5278 161.35 25.5873 165.29 25.5873 170.151V171.3V178.589ZM207.012 173.949V172.8V165.511C205.673 169.069 202.238 171.6 198.211 171.6C193.019 171.6 188.81 167.391 188.81 162.199V158.401C188.81 153.54 184.87 149.6 180.009 149.6C175.148 149.6 171.207 153.54 171.207 158.401V162.199C171.207 167.391 166.998 171.6 161.806 171.6C156.614 171.6 152.405 167.391 152.405 162.199V158.401C152.405 153.54 148.464 149.6 143.604 149.6C138.743 149.6 134.802 153.54 134.802 158.401V162.199C134.802 167.391 130.593 171.6 125.401 171.6C120.209 171.6 116 167.391 116 162.199V158.401C116 153.54 112.059 149.6 107.199 149.6C102.338 149.6 98.3974 153.54 98.3974 158.401V162.199C98.3974 167.391 94.1883 171.6 88.9961 171.6C83.8039 171.6 79.5949 167.391 79.5949 162.199V158.401C79.5949 153.54 75.6544 149.6 70.7936 149.6C65.9328 149.6 61.9923 153.54 61.9923 158.401V162.199C61.9923 167.391 57.7833 171.6 52.5911 171.6C47.3989 171.6 43.1898 167.391 43.1898 162.199V158.401C43.1898 153.54 39.2494 149.6 34.3886 149.6C29.5278 149.6 25.5873 153.54 25.5873 158.401V159.3V166.839C26.9269 163.281 30.3621 160.75 34.3886 160.75C39.5807 160.75 43.7898 164.959 43.7898 170.151V173.949C43.7898 178.81 47.7303 182.75 52.5911 182.75C57.4519 182.75 61.3923 178.81 61.3923 173.949V170.151C61.3923 164.959 65.6014 160.75 70.7936 160.75C75.9858 160.75 80.1949 164.959 80.1949 170.151V173.949C80.1949 178.81 84.1353 182.75 88.9961 182.75C93.8569 182.75 97.7974 178.81 97.7974 173.949V170.151C97.7974 164.959 102.006 160.75 107.199 160.75C112.391 160.75 116.6 164.959 116.6 170.151V173.949C116.6 178.81 120.54 182.75 125.401 182.75C130.262 182.75 134.202 178.81 134.202 173.949V170.151C134.202 164.959 138.411 160.75 143.604 160.75C148.796 160.75 153.005 164.959 153.005 170.151V173.949C153.005 178.81 156.945 182.75 161.806 182.75C166.667 182.75 170.607 178.81 170.607 173.949V170.151C170.607 164.959 174.817 160.75 180.009 160.75C185.201 160.75 189.41 164.959 189.41 170.151V173.949C189.41 178.81 193.35 182.75 198.211 182.75C203.072 182.75 207.012 178.81 207.012 173.949ZM207.012 162.199V161.05V153.511C205.673 157.069 202.238 159.6 198.211 159.6C193.019 159.6 188.81 155.391 188.81 150.199V146.401C188.81 141.54 184.87 137.6 180.009 137.6C175.148 137.6 171.207 141.54 171.207 146.401V150.199C171.207 155.391 166.998 159.6 161.806 159.6C156.614 159.6 152.405 155.391 152.405 150.199V146.401C152.405 141.54 148.464 137.6 143.604 137.6C138.743 137.6 134.802 141.54 134.802 146.401V150.199C134.802 155.391 130.593 159.6 125.401 159.6C120.209 159.6 116 155.391 116 150.199V146.401C116 141.54 112.059 137.6 107.199 137.6C102.338 137.6 98.3974 141.54 98.3974 146.401V150.199C98.3974 155.391 94.1883 159.6 88.9961 159.6C83.8039 159.6 79.5949 155.391 79.5949 150.199V146.401C79.5949 141.54 75.6544 137.6 70.7936 137.6C65.9328 137.6 61.9923 141.54 61.9923 146.401V150.199C61.9923 155.391 57.7833 159.6 52.5911 159.6C47.3989 159.6 43.1898 155.391 43.1898 150.199V146.401C43.1898 141.54 39.2494 137.6 34.3886 137.6C29.5278 137.6 25.5873 141.54 25.5873 146.401V147.3V155.089C26.9269 151.531 30.3621 149 34.3886 149C39.5807 149 43.7898 153.209 43.7898 158.401V162.199C43.7898 167.06 47.7303 171 52.5911 171C57.4519 171 61.3923 167.06 61.3923 162.199V158.401C61.3923 153.209 65.6014 149 70.7936 149C75.9858 149 80.1949 153.209 80.1949 158.401V162.199C80.1949 167.06 84.1353 171 88.9961 171C93.8569 171 97.7974 167.06 97.7974 162.199V158.401C97.7974 153.209 102.006 149 107.199 149C112.391 149 116.6 153.209 116.6 158.401V162.199C116.6 167.06 120.54 171 125.401 171C130.262 171 134.202 167.06 134.202 162.199V158.401C134.202 153.209 138.411 149 143.604 149C148.796 149 153.005 153.209 153.005 158.401V162.199C153.005 167.06 156.945 171 161.806 171C166.667 171 170.607 167.06 170.607 162.199V158.401C170.607 153.209 174.817 149 180.009 149C185.201 149 189.41 153.209 189.41 158.401V162.199C189.41 167.06 193.35 171 198.211 171C203.072 171 207.012 167.06 207.012 162.199ZM207.012 141.511V149.3V150.199C207.012 155.06 203.072 159 198.211 159C193.35 159 189.41 155.06 189.41 150.199V146.401C189.41 141.209 185.201 137 180.009 137C174.817 137 170.607 141.209 170.607 146.401V150.199C170.607 155.06 166.667 159 161.806 159C156.945 159 153.005 155.06 153.005 150.199V146.401C153.005 141.209 148.796 137 143.604 137C138.411 137 134.202 141.209 134.202 146.401V150.199C134.202 155.06 130.262 159 125.401 159C120.54 159 116.6 155.06 116.6 150.199V146.401C116.6 141.209 112.391 137 107.199 137C102.006 137 97.7974 141.209 97.7974 146.401V150.199C97.7974 155.06 93.8569 159 88.9961 159C84.1353 159 80.1949 155.06 80.1949 150.199V146.401C80.1949 141.209 75.9858 137 70.7936 137C65.6014 137 61.3923 141.209 61.3923 146.401V150.199C61.3923 155.06 57.4519 159 52.5911 159C47.7303 159 43.7898 155.06 43.7898 150.199V146.401C43.7898 141.209 39.5807 137 34.3886 137C30.3621 137 26.9269 139.531 25.5873 143.089V135.3V134.401C25.5873 129.54 29.5278 125.6 34.3886 125.6C39.2494 125.6 43.1898 129.54 43.1898 134.401V138.199C43.1898 143.391 47.3989 147.6 52.5911 147.6C57.7833 147.6 61.9923 143.391 61.9923 138.199V134.401C61.9923 129.54 65.9328 125.6 70.7936 125.6C75.6544 125.6 79.5949 129.54 79.5949 134.401V138.199C79.5949 143.391 83.8039 147.6 88.9961 147.6C94.1883 147.6 98.3974 143.391 98.3974 138.199V134.401C98.3974 129.54 102.338 125.6 107.199 125.6C112.059 125.6 116 129.54 116 134.401V138.199C116 143.391 120.209 147.6 125.401 147.6C130.593 147.6 134.802 143.391 134.802 138.199V134.401C134.802 129.54 138.743 125.6 143.604 125.6C148.464 125.6 152.405 129.54 152.405 134.401V138.199C152.405 143.391 156.614 147.6 161.806 147.6C166.998 147.6 171.207 143.391 171.207 138.199V134.401C171.207 129.54 175.148 125.6 180.009 125.6C184.87 125.6 188.81 129.54 188.81 134.401V138.199C188.81 143.391 193.019 147.6 198.211 147.6C202.238 147.6 205.673 145.069 207.012 141.511ZM207.012 138.199V137.3V129.511C205.673 133.069 202.238 135.6 198.211 135.6C193.019 135.6 188.81 131.391 188.81 126.199V122.401C188.81 117.54 184.87 113.6 180.009 113.6C175.148 113.6 171.207 117.54 171.207 122.401V126.199C171.207 131.391 166.998 135.6 161.806 135.6C156.614 135.6 152.405 131.391 152.405 126.199V122.401C152.405 117.54 148.464 113.6 143.604 113.6C138.743 113.6 134.802 117.54 134.802 122.401V126.199C134.802 131.391 130.593 135.6 125.401 135.6C120.209 135.6 116 131.391 116 126.199V122.401C116 117.54 112.059 113.6 107.199 113.6C102.338 113.6 98.3974 117.54 98.3974 122.401V126.199C98.3974 131.391 94.1883 135.6 88.9961 135.6C83.8039 135.6 79.5949 131.391 79.5949 126.199V122.401C79.5949 117.54 75.6544 113.6 70.7936 113.6C65.9328 113.6 61.9923 117.54 61.9923 122.401V126.199C61.9923 131.391 57.7833 135.6 52.5911 135.6C47.3989 135.6 43.1898 131.391 43.1898 126.199V122.401C43.1898 117.54 39.2494 113.6 34.3886 113.6C29.5278 113.6 25.5873 117.54 25.5873 122.401V123.3V131.089C26.9269 127.531 30.3621 125 34.3886 125C39.5807 125 43.7898 129.209 43.7898 134.401V138.199C43.7898 143.06 47.7303 147 52.5911 147C57.4519 147 61.3923 143.06 61.3923 138.199V134.401C61.3923 129.209 65.6014 125 70.7936 125C75.9858 125 80.1949 129.209 80.1949 134.401V138.199C80.1949 143.06 84.1353 147 88.9961 147C93.8569 147 97.7974 143.06 97.7974 138.199V134.401C97.7974 129.209 102.006 125 107.199 125C112.391 125 116.6 129.209 116.6 134.401V138.199C116.6 143.06 120.54 147 125.401 147C130.262 147 134.202 143.06 134.202 138.199V134.401C134.202 129.209 138.411 125 143.604 125C148.796 125 153.005 129.209 153.005 134.401V138.199C153.005 143.06 156.945 147 161.806 147C166.667 147 170.607 143.06 170.607 138.199V134.401C170.607 129.209 174.817 125 180.009 125C185.201 125 189.41 129.209 189.41 134.401V138.199C189.41 143.06 193.35 147 198.211 147C203.072 147 207.012 143.06 207.012 138.199ZM207.012 117.511V125.3V126.199C207.012 131.06 203.072 135 198.211 135C193.35 135 189.41 131.06 189.41 126.199V122.401C189.41 117.209 185.201 113 180.009 113C174.817 113 170.607 117.209 170.607 122.401V126.199C170.607 131.06 166.667 135 161.806 135C156.945 135 153.005 131.06 153.005 126.199V122.401C153.005 117.209 148.796 113 143.604 113C138.411 113 134.202 117.209 134.202 122.401V126.199C134.202 131.06 130.262 135 125.401 135C120.54 135 116.6 131.06 116.6 126.199V122.401C116.6 117.209 112.391 113 107.199 113C102.006 113 97.7974 117.209 97.7974 122.401V126.199C97.7974 131.06 93.8569 135 88.9961 135C84.1353 135 80.1949 131.06 80.1949 126.199V122.401C80.1949 117.209 75.9858 113 70.7936 113C65.6014 113 61.3923 117.209 61.3923 122.401V126.199C61.3923 131.06 57.4519 135 52.5911 135C47.7303 135 43.7898 131.06 43.7898 126.199V122.401C43.7898 117.209 39.5807 113 34.3886 113C30.3621 113 26.9269 115.531 25.5873 119.089V111.3V110.401C25.5873 105.54 29.5278 101.6 34.3886 101.6C39.2494 101.6 43.1898 105.54 43.1898 110.401V114.199C43.1898 119.391 47.3989 123.6 52.5911 123.6C57.7833 123.6 61.9923 119.391 61.9923 114.199V110.401C61.9923 105.54 65.9328 101.6 70.7936 101.6C75.6544 101.6 79.5949 105.54 79.5949 110.401V114.199C79.5949 119.391 83.8039 123.6 88.9961 123.6C94.1883 123.6 98.3974 119.391 98.3974 114.199V110.401C98.3974 105.54 102.338 101.6 107.199 101.6C112.059 101.6 116 105.54 116 110.401V114.199C116 119.391 120.209 123.6 125.401 123.6C130.593 123.6 134.802 119.391 134.802 114.199V110.401C134.802 105.54 138.743 101.6 143.604 101.6C148.464 101.6 152.405 105.54 152.405 110.401V114.199C152.405 119.391 156.614 123.6 161.806 123.6C166.998 123.6 171.207 119.391 171.207 114.199V110.401C171.207 105.54 175.148 101.6 180.009 101.6C184.87 101.6 188.81 105.54 188.81 110.401V114.199C188.81 119.391 193.019 123.6 198.211 123.6C202.238 123.6 205.673 121.069 207.012 117.511ZM207.012 114.199V113.3V105.511C205.673 109.069 202.238 111.6 198.211 111.6C193.019 111.6 188.81 107.391 188.81 102.199V98.4013C188.81 93.5405 184.87 89.6 180.009 89.6C175.148 89.6 171.207 93.5405 171.207 98.4013V102.199C171.207 107.391 166.998 111.6 161.806 111.6C156.614 111.6 152.405 107.391 152.405 102.199V98.4013C152.405 93.5405 148.464 89.6 143.604 89.6C138.743 89.6 134.802 93.5405 134.802 98.4013V102.199C134.802 107.391 130.593 111.6 125.401 111.6C120.209 111.6 116 107.391 116 102.199V98.4013C116 93.5405 112.059 89.6 107.199 89.6C102.338 89.6 98.3974 93.5405 98.3974 98.4013V102.199C98.3974 107.391 94.1883 111.6 88.9961 111.6C83.8039 111.6 79.5949 107.391 79.5949 102.199V98.4013C79.5949 93.5405 75.6544 89.6 70.7936 89.6C65.9328 89.6 61.9923 93.5405 61.9923 98.4013V102.199C61.9923 107.391 57.7833 111.6 52.5911 111.6C47.3989 111.6 43.1898 107.391 43.1898 102.199V98.4013C43.1898 93.5405 39.2494 89.6 34.3886 89.6C29.5278 89.6 25.5873 93.5405 25.5873 98.4013V99.3V107.089C26.9269 103.531 30.3621 101 34.3886 101C39.5807 101 43.7898 105.209 43.7898 110.401V114.199C43.7898 119.06 47.7303 123 52.5911 123C57.4519 123 61.3923 119.06 61.3923 114.199V110.401C61.3923 105.209 65.6014 101 70.7936 101C75.9858 101 80.1949 105.209 80.1949 110.401V114.199C80.1949 119.06 84.1353 123 88.9961 123C93.8569 123 97.7974 119.06 97.7974 114.199V110.401C97.7974 105.209 102.006 101 107.199 101C112.391 101 116.6 105.209 116.6 110.401V114.199C116.6 119.06 120.54 123 125.401 123C130.262 123 134.202 119.06 134.202 114.199V110.401C134.202 105.209 138.411 101 143.604 101C148.796 101 153.005 105.209 153.005 110.401V114.199C153.005 119.06 156.945 123 161.806 123C166.667 123 170.607 119.06 170.607 114.199V110.401C170.607 105.209 174.817 101 180.009 101C185.201 101 189.41 105.209 189.41 110.401V114.199C189.41 119.06 193.35 123 198.211 123C203.072 123 207.012 119.06 207.012 114.199ZM207.012 93.5108V101.3V102.199C207.012 107.06 203.072 111 198.211 111C193.35 111 189.41 107.06 189.41 102.199V98.4013C189.41 93.2091 185.201 89 180.009 89C174.817 89 170.607 93.2091 170.607 98.4013V102.199C170.607 107.06 166.667 111 161.806 111C156.945 111 153.005 107.06 153.005 102.199V98.4013C153.005 93.2091 148.796 89 143.604 89C138.411 89 134.202 93.2091 134.202 98.4013V102.199C134.202 107.06 130.262 111 125.401 111C120.54 111 116.6 107.06 116.6 102.199V98.4013C116.6 93.2091 112.391 89 107.199 89C102.006 89 97.7974 93.2091 97.7974 98.4013V102.199C97.7974 107.06 93.8569 111 88.9961 111C84.1353 111 80.1949 107.06 80.1949 102.199V98.4013C80.1949 93.2091 75.9858 89 70.7936 89C65.6014 89 61.3923 93.2091 61.3923 98.4013V102.199C61.3923 107.06 57.4519 111 52.5911 111C47.7303 111 43.7898 107.06 43.7898 102.199V98.4013C43.7898 93.2091 39.5807 89 34.3886 89C30.3621 89 26.9269 91.5312 25.5873 95.0893V87.3V86.4013C25.5873 81.5405 29.5278 77.6 34.3886 77.6C39.2494 77.6 43.1898 81.5405 43.1898 86.4013V90.1987C43.1898 95.3909 47.3989 99.6 52.5911 99.6C57.7833 99.6 61.9923 95.3909 61.9923 90.1987V86.4013C61.9923 81.5405 65.9328 77.6 70.7936 77.6C75.6544 77.6 79.5949 81.5405 79.5949 86.4013V90.1987C79.5949 95.3909 83.8039 99.6 88.9961 99.6C94.1883 99.6 98.3974 95.3909 98.3974 90.1987V86.4013C98.3974 81.5405 102.338 77.6 107.199 77.6C112.059 77.6 116 81.5405 116 86.4013V90.1987C116 95.3909 120.209 99.6 125.401 99.6C130.593 99.6 134.802 95.3909 134.802 90.1987V86.4013C134.802 81.5405 138.743 77.6 143.604 77.6C148.464 77.6 152.405 81.5405 152.405 86.4013V90.1987C152.405 95.3909 156.614 99.6 161.806 99.6C166.998 99.6 171.207 95.3909 171.207 90.1987V86.4013C171.207 81.5405 175.148 77.6 180.009 77.6C184.87 77.6 188.81 81.5405 188.81 86.4013V90.1987C188.81 95.3909 193.019 99.6 198.211 99.6C202.238 99.6 205.673 97.0688 207.012 93.5108ZM207.012 90.1987V89.3V81.5108C205.673 85.0688 202.238 87.6 198.211 87.6C193.019 87.6 188.81 83.3909 188.81 78.1987V74.4013C188.81 69.5405 184.87 65.6 180.009 65.6C175.148 65.6 171.207 69.5405 171.207 74.4013V78.1987C171.207 83.3909 166.998 87.6 161.806 87.6C156.614 87.6 152.405 83.3909 152.405 78.1987V74.4013C152.405 69.5405 148.464 65.6 143.604 65.6C138.743 65.6 134.802 69.5405 134.802 74.4013V78.1987C134.802 83.3909 130.593 87.6 125.401 87.6C120.209 87.6 116 83.3909 116 78.1987V74.4013C116 69.5405 112.059 65.6 107.199 65.6C102.338 65.6 98.3974 69.5405 98.3974 74.4013V78.1987C98.3974 83.3909 94.1883 87.6 88.9961 87.6C83.8039 87.6 79.5949 83.3909 79.5949 78.1987V74.4013C79.5949 69.5405 75.6544 65.6 70.7936 65.6C65.9328 65.6 61.9923 69.5405 61.9923 74.4013V78.1987C61.9923 83.3909 57.7833 87.6 52.5911 87.6C47.3989 87.6 43.1898 83.3909 43.1898 78.1987V74.4013C43.1898 69.5405 39.2494 65.6 34.3886 65.6C29.5278 65.6 25.5873 69.5405 25.5873 74.4013V75.3V83.0893C26.9269 79.5312 30.3621 77 34.3886 77C39.5807 77 43.7898 81.2091 43.7898 86.4013V90.1987C43.7898 95.0595 47.7303 99 52.5911 99C57.4519 99 61.3923 95.0595 61.3923 90.1987V86.4013C61.3923 81.2091 65.6014 77 70.7936 77C75.9858 77 80.1949 81.2091 80.1949 86.4013V90.1987C80.1949 95.0595 84.1353 99 88.9961 99C93.8569 99 97.7974 95.0595 97.7974 90.1987V86.4013C97.7974 81.2091 102.006 77 107.199 77C112.391 77 116.6 81.2091 116.6 86.4013V90.1987C116.6 95.0595 120.54 99 125.401 99C130.262 99 134.202 95.0595 134.202 90.1987V86.4013C134.202 81.2091 138.411 77 143.604 77C148.796 77 153.005 81.2091 153.005 86.4013V90.1987C153.005 95.0595 156.945 99 161.806 99C166.667 99 170.607 95.0595 170.607 90.1987V86.4013C170.607 81.2091 174.817 77 180.009 77C185.201 77 189.41 81.2091 189.41 86.4013V90.1987C189.41 95.0595 193.35 99 198.211 99C203.072 99 207.012 95.0595 207.012 90.1987ZM207.012 69.5108V77.3V78.1987C207.012 83.0595 203.072 87 198.211 87C193.35 87 189.41 83.0595 189.41 78.1987V74.4013C189.41 69.2091 185.201 65 180.009 65C174.817 65 170.607 69.2091 170.607 74.4013V78.1987C170.607 83.0595 166.667 87 161.806 87C156.945 87 153.005 83.0595 153.005 78.1987V74.4013C153.005 69.2091 148.796 65 143.604 65C138.411 65 134.202 69.2091 134.202 74.4013V78.1987C134.202 83.0595 130.262 87 125.401 87C120.54 87 116.6 83.0595 116.6 78.1987V74.4013C116.6 69.2091 112.391 65 107.199 65C102.006 65 97.7974 69.2091 97.7974 74.4013V78.1987C97.7974 83.0595 93.8569 87 88.9961 87C84.1353 87 80.1949 83.0595 80.1949 78.1987V74.4013C80.1949 69.2091 75.9858 65 70.7936 65C65.6014 65 61.3923 69.2091 61.3923 74.4013V78.1987C61.3923 83.0595 57.4519 87 52.5911 87C47.7303 87 43.7898 83.0595 43.7898 78.1987V74.4013C43.7898 69.2091 39.5807 65 34.3886 65C30.3621 65 26.9269 67.5312 25.5873 71.0893V63.3V62.4013C25.5873 57.5405 29.5278 53.6 34.3886 53.6C39.2494 53.6 43.1898 57.5405 43.1898 62.4013V66.1987C43.1898 71.3909 47.3989 75.6 52.5911 75.6C57.7833 75.6 61.9923 71.3909 61.9923 66.1987V62.4013C61.9923 57.5405 65.9328 53.6 70.7936 53.6C75.6544 53.6 79.5949 57.5405 79.5949 62.4013V66.1987C79.5949 71.3909 83.8039 75.6 88.9961 75.6C94.1883 75.6 98.3974 71.3909 98.3974 66.1987V62.4013C98.3974 57.5405 102.338 53.6 107.199 53.6C112.059 53.6 116 57.5405 116 62.4013V66.1987C116 71.3909 120.209 75.6 125.401 75.6C130.593 75.6 134.802 71.3909 134.802 66.1987V62.4013C134.802 57.5405 138.743 53.6 143.604 53.6C148.464 53.6 152.405 57.5405 152.405 62.4013V66.1987C152.405 71.3909 156.614 75.6 161.806 75.6C166.998 75.6 171.207 71.3909 171.207 66.1987V62.4013C171.207 57.5405 175.148 53.6 180.009 53.6C184.87 53.6 188.81 57.5405 188.81 62.4013V66.1987C188.81 71.3909 193.019 75.6 198.211 75.6C202.238 75.6 205.673 73.0688 207.012 69.5108ZM207.012 66.1987V65.3V57.5108C205.673 61.0688 202.238 63.6 198.211 63.6C193.019 63.6 188.81 59.3909 188.81 54.1987V50.4013C188.81 45.5405 184.87 41.6 180.009 41.6C175.148 41.6 171.207 45.5405 171.207 50.4013V54.1987C171.207 59.3909 166.998 63.6 161.806 63.6C156.614 63.6 152.405 59.3909 152.405 54.1987V50.4013C152.405 45.5405 148.464 41.6 143.604 41.6C138.743 41.6 134.802 45.5405 134.802 50.4013V54.1987C134.802 59.3909 130.593 63.6 125.401 63.6C120.209 63.6 116 59.3909 116 54.1987V50.4013C116 45.5405 112.059 41.6 107.199 41.6C102.338 41.6 98.3974 45.5405 98.3974 50.4013V54.1987C98.3974 59.3909 94.1883 63.6 88.9961 63.6C83.8039 63.6 79.5949 59.3909 79.5949 54.1987V50.4013C79.5949 45.5405 75.6544 41.6 70.7936 41.6C65.9328 41.6 61.9923 45.5405 61.9923 50.4013V54.1987C61.9923 59.3909 57.7833 63.6 52.5911 63.6C47.3989 63.6 43.1898 59.3909 43.1898 54.1987V50.4013C43.1898 45.5405 39.2494 41.6 34.3886 41.6C29.5278 41.6 25.5873 45.5405 25.5873 50.4013V51.3V59.0892C26.9269 55.5312 30.3621 53 34.3886 53C39.5807 53 43.7898 57.2091 43.7898 62.4013V66.1987C43.7898 71.0595 47.7303 75 52.5911 75C57.4519 75 61.3923 71.0595 61.3923 66.1987V62.4013C61.3923 57.2091 65.6014 53 70.7936 53C75.9858 53 80.1949 57.2091 80.1949 62.4013V66.1987C80.1949 71.0595 84.1353 75 88.9961 75C93.8569 75 97.7974 71.0595 97.7974 66.1987V62.4013C97.7974 57.2091 102.006 53 107.199 53C112.391 53 116.6 57.2091 116.6 62.4013V66.1987C116.6 71.0595 120.54 75 125.401 75C130.262 75 134.202 71.0595 134.202 66.1987V62.4013C134.202 57.2091 138.411 53 143.604 53C148.796 53 153.005 57.2091 153.005 62.4013V66.1987C153.005 71.0595 156.945 75 161.806 75C166.667 75 170.607 71.0595 170.607 66.1987V62.4013C170.607 57.2091 174.817 53 180.009 53C185.201 53 189.41 57.2091 189.41 62.4013V66.1987C189.41 71.0595 193.35 75 198.211 75C203.072 75 207.012 71.0595 207.012 66.1987ZM207.012 45.5108V53.3V54.1987C207.012 59.0595 203.072 63 198.211 63C193.35 63 189.41 59.0595 189.41 54.1987V50.4013C189.41 45.2091 185.201 41 180.009 41C174.817 41 170.607 45.2091 170.607 50.4013V54.1987C170.607 59.0595 166.667 63 161.806 63C156.945 63 153.005 59.0595 153.005 54.1987V50.4013C153.005 45.2091 148.796 41 143.604 41C138.411 41 134.202 45.2091 134.202 50.4013V54.1987C134.202 59.0595 130.262 63 125.401 63C120.54 63 116.6 59.0595 116.6 54.1987V50.4013C116.6 45.2091 112.391 41 107.199 41C102.006 41 97.7974 45.2091 97.7974 50.4013V54.1987C97.7974 59.0595 93.8569 63 88.9961 63C84.1353 63 80.1949 59.0595 80.1949 54.1987V50.4013C80.1949 45.2091 75.9858 41 70.7936 41C65.6014 41 61.3923 45.2091 61.3923 50.4013V54.1987C61.3923 59.0595 57.4519 63 52.5911 63C47.7303 63 43.7898 59.0595 43.7898 54.1987V50.4013C43.7898 45.2091 39.5807 41 34.3886 41C30.3621 41 26.9269 43.5312 25.5873 47.0892V39.3V38.4013C25.5873 33.5405 29.5278 29.6 34.3886 29.6C39.2494 29.6 43.1898 33.5405 43.1898 38.4013V42.1987C43.1898 47.3909 47.3989 51.6 52.5911 51.6C57.7833 51.6 61.9923 47.3909 61.9923 42.1987V38.4013C61.9923 33.5405 65.9328 29.6 70.7936 29.6C75.6544 29.6 79.5949 33.5405 79.5949 38.4013V42.1987C79.5949 47.3909 83.8039 51.6 88.9961 51.6C94.1883 51.6 98.3974 47.3909 98.3974 42.1987V38.4013C98.3974 33.5405 102.338 29.6 107.199 29.6C112.059 29.6 116 33.5405 116 38.4013V42.1987C116 47.3909 120.209 51.6 125.401 51.6C130.593 51.6 134.802 47.3909 134.802 42.1987V38.4013C134.802 33.5405 138.743 29.6 143.604 29.6C148.464 29.6 152.405 33.5405 152.405 38.4013V42.1987C152.405 47.3909 156.614 51.6 161.806 51.6C166.998 51.6 171.207 47.3909 171.207 42.1987V38.4013C171.207 33.5405 175.148 29.6 180.009 29.6C184.87 29.6 188.81 33.5405 188.81 38.4013V42.1987C188.81 47.3909 193.019 51.6 198.211 51.6C202.238 51.6 205.673 49.0688 207.012 45.5108ZM207.012 42.1987V41.3V33.5108C205.673 37.0688 202.238 39.6 198.211 39.6C193.019 39.6 188.81 35.3909 188.81 30.1987V26.4013C188.81 21.5405 184.87 17.6 180.009 17.6C175.148 17.6 171.207 21.5405 171.207 26.4013V30.1987C171.207 35.3909 166.998 39.6 161.806 39.6C156.614 39.6 152.405 35.3909 152.405 30.1987V26.4013C152.405 21.5405 148.464 17.6 143.604 17.6C138.743 17.6 134.802 21.5405 134.802 26.4013V30.1987C134.802 35.3909 130.593 39.6 125.401 39.6C120.209 39.6 116 35.3909 116 30.1987V26.4013C116 21.5405 112.059 17.6 107.199 17.6C102.338 17.6 98.3974 21.5405 98.3974 26.4013V30.1987C98.3974 35.3909 94.1883 39.6 88.9961 39.6C83.8039 39.6 79.5949 35.3909 79.5949 30.1987V26.4013C79.5949 21.5405 75.6544 17.6 70.7936 17.6C65.9328 17.6 61.9923 21.5405 61.9923 26.4013V30.1987C61.9923 35.3909 57.7833 39.6 52.5911 39.6C47.3989 39.6 43.1898 35.3909 43.1898 30.1987V26.4013C43.1898 21.5405 39.2494 17.6 34.3886 17.6C29.5278 17.6 25.5873 21.5405 25.5873 26.4013V27.3V35.0892C26.9269 31.5312 30.3621 29 34.3886 29C39.5807 29 43.7898 33.2091 43.7898 38.4013V42.1987C43.7898 47.0595 47.7303 51 52.5911 51C57.4519 51 61.3923 47.0595 61.3923 42.1987V38.4013C61.3923 33.2091 65.6014 29 70.7936 29C75.9858 29 80.1949 33.2091 80.1949 38.4013V42.1987C80.1949 47.0595 84.1353 51 88.9961 51C93.8569 51 97.7974 47.0595 97.7974 42.1987V38.4013C97.7974 33.2091 102.006 29 107.199 29C112.391 29 116.6 33.2091 116.6 38.4013V42.1987C116.6 47.0595 120.54 51 125.401 51C130.262 51 134.202 47.0595 134.202 42.1987V38.4013C134.202 33.2091 138.411 29 143.604 29C148.796 29 153.005 33.2091 153.005 38.4013V42.1987C153.005 47.0595 156.945 51 161.806 51C166.667 51 170.607 47.0595 170.607 42.1987V38.4013C170.607 33.2091 174.817 29 180.009 29C185.201 29 189.41 33.2091 189.41 38.4013V42.1987C189.41 47.0595 193.35 51 198.211 51C203.072 51 207.012 47.0595 207.012 42.1987ZM207.012 21.5108V29.3V30.1987C207.012 35.0595 203.072 39 198.211 39C193.35 39 189.41 35.0595 189.41 30.1987V26.4013C189.41 21.2091 185.201 17 180.009 17C174.817 17 170.607 21.2091 170.607 26.4013V30.1987C170.607 35.0595 166.667 39 161.806 39C156.945 39 153.005 35.0595 153.005 30.1987V26.4013C153.005 21.2091 148.796 17 143.604 17C138.411 17 134.202 21.2091 134.202 26.4013V30.1987C134.202 35.0595 130.262 39 125.401 39C120.54 39 116.6 35.0595 116.6 30.1987V26.4013C116.6 21.2091 112.391 17 107.199 17C102.006 17 97.7974 21.2091 97.7974 26.4013V30.1987C97.7974 35.0595 93.8569 39 88.9961 39C84.1353 39 80.1949 35.0595 80.1949 30.1987V26.4013C80.1949 21.2091 75.9858 17 70.7936 17C65.6014 17 61.3923 21.2091 61.3923 26.4013V30.1987C61.3923 35.0595 57.4519 39 52.5911 39C47.7303 39 43.7898 35.0595 43.7898 30.1987V26.4013C43.7898 21.2091 39.5807 17 34.3886 17C30.3621 17 26.9269 19.5312 25.5873 23.0892V15.3V14.4013C25.5873 9.54046 29.5278 5.6 34.3886 5.6C39.2494 5.6 43.1898 9.54046 43.1898 14.4013V18.1987C43.1898 23.3909 47.3989 27.6 52.5911 27.6C57.7833 27.6 61.9923 23.3909 61.9923 18.1987V14.4013C61.9923 9.54046 65.9328 5.6 70.7936 5.6C75.6544 5.6 79.5949 9.54046 79.5949 14.4013V18.1987C79.5949 23.3909 83.8039 27.6 88.9961 27.6C94.1883 27.6 98.3974 23.3909 98.3974 18.1987V14.4013C98.3974 9.54046 102.338 5.6 107.199 5.6C112.059 5.6 116 9.54046 116 14.4013V18.1987C116 23.3909 120.209 27.6 125.401 27.6C130.593 27.6 134.802 23.3909 134.802 18.1987V14.4013C134.802 9.54046 138.743 5.6 143.604 5.6C148.464 5.6 152.405 9.54046 152.405 14.4013V18.1987C152.405 23.3909 156.614 27.6 161.806 27.6C166.998 27.6 171.207 23.3909 171.207 18.1987V14.4013C171.207 9.54046 175.148 5.6 180.009 5.6C184.87 5.6 188.81 9.54046 188.81 14.4013V18.1987C188.81 23.3909 193.019 27.6 198.211 27.6C202.238 27.6 205.673 25.0688 207.012 21.5108ZM207.012 18.1987V17.3V9.51076C205.673 13.0688 202.238 15.6 198.211 15.6C193.019 15.6 188.81 11.3909 188.81 6.19874V2.40126C188.81 -2.45954 184.87 -6.4 180.009 -6.4C175.148 -6.4 171.207 -2.45954 171.207 2.40126V6.19874C171.207 11.3909 166.998 15.6 161.806 15.6C156.614 15.6 152.405 11.3909 152.405 6.19874V2.40126C152.405 -2.45954 148.464 -6.4 143.604 -6.4C138.743 -6.4 134.802 -2.45954 134.802 2.40126V6.19874C134.802 11.3909 130.593 15.6 125.401 15.6C120.209 15.6 116 11.3909 116 6.19874V2.40126C116 -2.45954 112.059 -6.4 107.199 -6.4C102.338 -6.4 98.3974 -2.45954 98.3974 2.40126V6.19874C98.3974 11.3909 94.1883 15.6 88.9961 15.6C83.8039 15.6 79.5949 11.3909 79.5949 6.19874V2.40126C79.5949 -2.45954 75.6544 -6.4 70.7936 -6.4C65.9328 -6.4 61.9923 -2.45954 61.9923 2.40126V6.19874C61.9923 11.3909 57.7833 15.6 52.5911 15.6C47.3989 15.6 43.1898 11.3909 43.1898 6.19874V2.40126C43.1898 -2.45954 39.2494 -6.4 34.3886 -6.4C29.5278 -6.4 25.5873 -2.45954 25.5873 2.40126V11.0893C26.9269 7.53124 30.3621 5 34.3886 5C39.5807 5 43.7898 9.20909 43.7898 14.4013V18.1987C43.7898 23.0595 47.7303 27 52.5911 27C57.4519 27 61.3923 23.0595 61.3923 18.1987V14.4013C61.3923 9.20909 65.6014 5 70.7936 5C75.9858 5 80.1949 9.20909 80.1949 14.4013V18.1987C80.1949 23.0595 84.1353 27 88.9961 27C93.8569 27 97.7974 23.0595 97.7974 18.1987V14.4013C97.7974 9.20909 102.006 5 107.199 5C112.391 5 116.6 9.20909 116.6 14.4013V18.1987C116.6 23.0595 120.54 27 125.401 27C130.262 27 134.202 23.0595 134.202 18.1987V14.4013C134.202 9.20909 138.411 5 143.604 5C148.796 5 153.005 9.20909 153.005 14.4013V18.1987C153.005 23.0595 156.945 27 161.806 27C166.667 27 170.607 23.0595 170.607 18.1987V14.4013C170.607 9.20909 174.817 5 180.009 5C185.201 5 189.41 9.20909 189.41 14.4013V18.1987C189.41 23.0595 193.35 27 198.211 27C203.072 27 207.012 23.0595 207.012 18.1987Z'
        fill='url(#paint0_linear_2603_2400)'
        fillOpacity={0.1}
      />
    </g>
    <defs>
      <linearGradient
        id='paint0_linear_2603_2400'
        x1={172.142}
        y1={195.1}
        x2={23.07}
        y2={195.1}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#8A8A8A' />
        <stop offset={1} stopColor='#8A8A8A' stopOpacity={0} />
      </linearGradient>
      <clipPath id='clip0_2603_2400'>
        <rect width={190} height={251} fill='white' />
      </clipPath>
    </defs>
  </svg>
);

const Memo = memo(PatternHolderIcon);
export { Memo as PatternHolderIcon };
