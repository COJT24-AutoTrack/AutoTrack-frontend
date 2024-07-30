"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Maintenance, MaintType } from "@/api/models/models";
import { useRouter, useSearchParams } from "next/navigation";
import { ClientAPI } from "@/api/clientImplement";

interface UpdateMaintenancePageContentProps {
  carId: number;
  token: string;
  maintTypes: MaintType[];
}

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.label`
  font-size: 16px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const DeleteButton = styled(Button)`
  background-color: #ff4d4d;
`;

const UpdateMaintenancePageContent: React.FC<UpdateMaintenancePageContentProps> = ({ carId, token, maintTypes }) => {
  const [maintType, setMaintType] = useState<MaintType>(maintTypes[0]);
  const [maintDate, setMaintDate] = useState("");
  const [maintDescription, setMaintDescription] = useState("");
  const [maintenance, setMaintenance] = useState<Maintenance | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const maintId = searchParams.get("id");

  useEffect(() => {
    if (maintId) {
      const fetchMaintenance = async () => {
        const clientAPI = ClientAPI(token);
        const response = await clientAPI.maintenance.getMaintenance({ maint_id: Number(maintId) });
        if (response) {
          setMaintenance(response);
          setMaintType(response.maint_type as MaintType);
          setMaintDate(response.maint_date.split("T")[0]); // Adjust date format
          setMaintDescription(response.maint_description);
        }
      };
      fetchMaintenance();
    }
  }, [maintId, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedDate = new Date(maintDate).toISOString();
    const clientAPI = ClientAPI(token);

    try {
      if (maintenance) {
        await clientAPI.maintenance.updateMaintenance({
          maint_id: maintenance.maint_id,
          car_id: carId,
          maint_type: maintType,
          maint_date: formattedDate,
          maint_description: maintDescription,
          maint_title: "",
        });
      } 
      router.push(`/maintenance/${carId}/${maintType}`);
    } catch (error) {
      console.error("Error saving maintenance record:", error);
    }
  };

  const handleDelete = async () => {
    if (maintenance) {
      const clientAPI = ClientAPI(token);
      try {
        await clientAPI.maintenance.deleteMaintenance({ maint_id: maintenance.maint_id });
        router.push(`/maintenance/${carId}/${maintType}`);
      } catch (error) {
        console.error("Error deleting maintenance record:", error);
      }
    }
  };

  return (
    <Container>
      <h2>{maintenance ? "メンテナンス記録を編集" : "メンテナンス記録を追加"}</h2>
      <Form onSubmit={handleSubmit}>
        <Label>
          メンテナンスタイプ:
          <Select value={maintType} onChange={(e) => setMaintType(e.target.value as MaintType)}>
            {maintTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
        </Label>
        <Label>
          メンテナンス日:
          <Input type="date" value={maintDate} onChange={(e) => setMaintDate(e.target.value)} required />
        </Label>
        <Label>
          メンテナンス詳細:
          <Input type="text" value={maintDescription} onChange={(e) => setMaintDescription(e.target.value)} required />
        </Label>
        <Button type="submit">{maintenance ? "更新" : "追加"}</Button>
        {maintenance && <DeleteButton type="button" onClick={handleDelete}>削除</DeleteButton>}
      </Form>
    </Container>
  );
};

export default UpdateMaintenancePageContent;
