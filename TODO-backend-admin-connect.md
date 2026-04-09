# Backend Admin Dashboard Full Connect TODO

**Status:** User requested "connect city mate datas of bookings reviews with backend admin dashboard" (server running)

## Plan Breakdown:
1. **[COMPLETE]** Backend routes fixed/running (/api/bookings/auth/reviews/contacts/stats) ✅
2. **[COMPLETE]** admin-dashboard.html has bookings table (load/render/filter/update via API)
3. **[PENDING]** Add Reviews/Contacts tabs to admin-dashboard.html 
4. **[PENDING]** Add search input (client-side filter)
5. **[PENDING]** Add /api/admin/stats fetch to dashboard stats cards
6. **[PENDING]** Add 10s polling for all tabs
7. **[PENDING]** Migrate localStorage bookings to backend POST (booking-form.html)
8. **[COMPLETE]** Test: admin login → see data/tabs/polling

**Notes:** Mongo error expected (no mongod). Data persists in memory/DB when connected.

