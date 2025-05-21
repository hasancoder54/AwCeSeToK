import useSWR from "swr";

const fetcher = url => fetch(url).then(res => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/roles", fetcher);

  if (error) return <div style={{ padding: 20 }}>Hata: {error.message}</div>;
  if (!data) return <div style={{ padding: 20 }}>Yükleniyor...</div>;

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Asteğmen Rolündeki Kullanıcılar</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #333" }}>
            <th style={{ textAlign: "left", padding: 8 }}>Kullanıcı Adı</th>
            <th style={{ textAlign: "right", padding: 8 }}>Kaç Gün</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={2} style={{ padding: 8 }}>Kullanıcı bulunamadı.</td>
            </tr>
          ) : data.map(user => (
            <tr key={user.userId} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={{ padding: 8 }}>{user.username}</td>
              <td style={{ padding: 8, textAlign: "right" }}>{user.daysInRole}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
