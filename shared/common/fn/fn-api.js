!function e(){var a=Okta.Constants,c=Okta.BrowserUtil,u=_okta.omit,p=Okta.fn.base.timestamp,t=Okta.fn.api={},n="/api/internal/enduser/home",i="/api/v1/users/me/home/tabs?expand=items%2Citems.resource";t.prependPath=function(e){return"/api/plugin/2"+e},t.getEndUserHomeUri=function(){return n},t.getSelfServiceSiteInfo=function(e){return e&&e.orgSettings&&e.orgSettings.pluginRunOnAppSignupEnabled?"/self-service-site-maps":"/hashed-self-service-sites"},t.getToSettings=function(e,t){var n=-1==e.indexOf("?")?"?":"&";return{type:"get",url:e+n+"plugin_version="+(t.backgroundVersion+"-"+t.contentVersion),headers:{Accept:"application/json;charset=utf-8"}}},t.getTabsPathInfo=function(e){return e.orgSettings&&e.orgSettings.pluginPopoverQuickAccessAppsEnabled?i+"&type=all":i},t.isEnduserHomeValid=function(e){return!!e&&!!e.userId&&!!e.orgId},t.postToPendoTrackEventSettings=function(e,t,n,i){var r=t.timestamp||p(),s=u(t,"timestamp"),o={type:"track",event:e,visitorId:n.userId,accountId:n.orgId,timestamp:r,properties:s,context:{userAgent:c.getUserAgent(),title:"okta-plugin"}};return{type:"post",url:i?a.PendoEventTrackUrlDebug:a.PendoEventTrackUrl,data:JSON.stringify(o),headers:{"content-type":"application/json","x-pendo-integration-key":"cc0bda8c-c34a-4b91-5719-634058959cf0"}}},t.setSessionData=function(e,t){return e&&(e.idx?t["X-Okta-Idx-Session-Jwe"]=e.idx:(t["X-Session-Id"]=e.sid,t["X-Device-Token"]=e.DT)),t},t.setAuthData=function(e,t){return e&&e.access_token&&(t.Authorization="Bearer "+e.access_token.accessToken),t}}();