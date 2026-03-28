import { lexachatConfig } from './lexachatProxy.js';
import { flexaConfig } from './flexaProxy.js';

export const proxyApps = [lexachatConfig, flexaConfig];

export const getProxyConfig = (slug) => proxyApps.find((app) => app.slug === slug);
