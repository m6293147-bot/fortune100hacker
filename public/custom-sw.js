self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'daily-notification') {
    event.waitUntil(showDailyNotification());
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || 'https://refpa14435.com/L?tag=d_2500605m_1573c_&site=2500605&ad=1573';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

async function showDailyNotification() {
  const title = 'سكربت العنكبوت';
  const options = {
    body: 'حتي الان لم تسجل سجل الان وابداء في الربح',
    icon: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi1VJNEbdMZjhYrQt14NV463BhN-dnWtqJXXJD8AUdx0-MtiDiuFOC_W46SZfEWySzMv4z5M-Df_94YzM_kIEiVAqYMd_mA68BHDcOE2_VoFuIeCtE1rpSyLi2HedCTcTdX4DXi7Ea38972hAxBjFajGSrXM9KQmbIrAZJdGD2_tPED69TvHn-p4ruSmSfd/s1500/%D8%A7%D9%84%D8%B9%D9%86%D9%88%D8%A7%D9%86%20%281%29.png',
    badge: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi1VJNEbdMZjhYrQt14NV463BhN-dnWtqJXXJD8AUdx0-MtiDiuFOC_W46SZfEWySzMv4z5M-Df_94YzM_kIEiVAqYMd_mA68BHDcOE2_VoFuIeCtE1rpSyLi2HedCTcTdX4DXi7Ea38972hAxBjFajGSrXM9KQmbIrAZJdGD2_tPED69TvHn-p4ruSmSfd/s1500/%D8%A7%D9%84%D8%B9%D9%86%D9%88%D8%A7%D9%86%20%281%29.png',
    tag: 'daily-reminder',
    renotify: true,
    data: {
      url: 'https://refpa14435.com/L?tag=d_2500605m_1573c_&site=2500605&ad=1573'
    }
  };
  await self.registration.showNotification(title, options);
}
