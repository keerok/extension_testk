Okta.startBackgroundScript=function(r,a,i,u){var d=1e3,o=Okta.Q.when,c=Okta.fn.storage.wrapVal,g=Okta.fn.base.timestamp,p=Okta.fn.api.getToSettings,l=Okta.fn.api.prependPath,f=Okta.fn.api.setSessionData,k=_okta.first,h=_okta.filter,s=_okta.isUndefined,y=Okta.Q;function v(e){return"_lock_"+e}function b(){return s(r.isInstalledByUser)?y(!0):r.isInstalledByUser()}function m(e,t,n,o){switch(e){case"getSessionState":return a.get(n.key);case"setSessionState":return a.set(n.key,n.val);case"getPersistentState":return i.get(n.key);case"setPersistentState":return i.set(n.key,n.val);case"clearPersistentState":return i.clear?n.result=i.clear():n.result=!0,n.browserType=r.getType(),n;case"getTabId":return t;case"documentLoaded":return s(r.documentLoaded)?y({errorCode:"not supported by this version of the plugin"}):r.documentLoaded(t,o);case"getBrowserType":return r.getType();case"getBackgroundVersion":return r.getBackgroundVersion();case"unlockSessionKey":return function e(t){return a.set(v(t),null),!0}(n.key);case"lockSessionKey":return function e(t){var n=g(),o=v(t),s=a.get(o);return(!s||n>s.lockTime+d)&&(a.set(o,{lockTime:n}),!0)}(n.key);case"request":return u.ajax(n);case"openTab":return r.openTab(n.url);case"hasPrivacyPermissions":return r.hasPrivacyPermissions?r.hasPrivacyPermissions():y(c(!0));case"openPermissionsPage":return r.openPermissionsPage?r.openPermissionsPage():y({errorCode:"openPermissionsPage is not supported on "+r.getType()});case"servePopover":return r.servePopover?r.servePopover():y({errorCode:"servePopover is not supported on "+r.getType()});case"suppressSavePassword":return r.suppressSavePassword?r.suppressSavePassword(t,n):y({errorCode:"suppressSavePassword is not supported on "+r.getType()});case"getPasswordSavingDetails":return r.getPasswordSavingDetails?r.getPasswordSavingDetails():y({errorCode:"getPasswordSavingDetails is not supported on "+r.getType()});case"openTabForAccountChooser":return s(r.openTabForAccountChooser)?y({errorCode:"not supported by this version of the plugin",url:n.url}):r.openTabForAccountChooser(n.url);case"closeTab":return r.closeTab(t);case"getCookies":return s(r.getCookies)?y({errorCode:"not supported by this version of the plugin"}):r.getCookies(n.key.hostUrl,n.key.cookieNames,t);case"getLocalStorageUsage":return s(r.getLocalStorageUsage)?y({errorCode:"not supported by this version of the plugin"}):r.getLocalStorageUsage().fail(function(e){return y({errorCode:"failed to get the local storage usage: "+e})});case"updateBadge":return s(r.updateBadge)?y.resolve():r.updateBadge(n.key);case"downloadExtensionLogs":return s(r.downloadExtensionLogs)?y.resolve():r.downloadExtensionLogs(n.key);case"setUninstallURL":return s(r.setUninstallURL)?y.resolve():r.setUninstallURL(n.url||"");case"isInstalledByUser":return b();case"injectContentScript":return r.injectContentScript&&r.injectContentScript(t,o),y();case"getSessionTabState":return a.get(n.key+"_"+t);default:return y({errorCode:"Unknown msg type: "+e})}}function S(e){i.set("PENDO_ONBOARDING_DATA",c({sentTo:e,timestamp:g()}))}r.on("injectReady",function(e){r.injectScript(e,null)}),r.on("messageFromContent",function(t){var n=t.msg,e=m(n.type,t.tabId,n.data,t.frameId);o(e,function(e){r.post({msg:{id:n.id,type:n.type,data:e},tabId:t.tabId,portInfo:t.portInfo})}).done()}),r.on("messageFromContentOnce",function(t){var n=t.msg,e=m(n.type,t.tabId,n.data,t.frameId);o(e,function(e){r.postOnce({msg:{id:n.id,type:n.type,data:e},tabId:t.tabId,senderInfo:t.senderInfo})}).done()}),r.on("postInstall",function(){return i.set("ONBOARDING_FLOW",c(!0)),b().then(function(e){return Okta.Config.onboardingLaunchNewTab&&e?r.getOrgsWithSessionCookies():y(null)}).then(function(e){if(e)if(e.oktaAccounts&&0!==e.oktaAccounts.length){var t=1===e.oktaAccounts.length;if(!e.sessions||0===e.sessions.length)return r.openTab(t?k(e.oktaAccounts).origin+"/login/login.htm":"https://login.okta.com"),void S(t?"orgLogin":"oktaLogin");var n=h(e.sessions,function(e){return e.tabId!==undefined});if(!t&&0===n.length)return r.openTab("https://login.okta.com"),void S("oktaLogin");var o=k(t?e.sessions:n),s=p(o.domain+l("/settings"),{backgroundVersion:r.getBackgroundVersion(),contentVersion:""});f({sid:o.sid,DT:o.dt,idx:o.idx},s.headers),u.ajax(s).then(function(e){e?(i.set("PLUGIN_SETTINGS",c({override:{},orgSettings:e})),e.pluginOnboardingEnabled?o.tabId!==undefined&&o.isDashboardTab?(r.highlightAndRefreshTab(o.tabId),S("refreshDashboard")):(r.openTab(o.domain+"/app/UserHome"),S("openDashboard")):S("none")):S("none")})}else S("zeroOrgs")})})};