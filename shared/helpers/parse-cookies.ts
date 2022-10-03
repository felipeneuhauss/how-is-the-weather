import cookie from 'cookie';
import { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

const parseCookies = (req: IncomingMessage & {
  cookies: NextApiRequestCookies
}) => cookie.parse(req ? req.headers.cookie || '' : document.cookie);
export default parseCookies;
